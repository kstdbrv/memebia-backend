import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { MemeModel } from '@features/memes/models/meme.model';
import { Injectable } from '@nestjs/common';
import { memeToMemeWithUrlDto } from '@features/memes/dto/meme-to-meme-with-url.dto';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  ImportConfig,
} from '@config/configuration.model';
import { MemeWithUrlModel } from '@features/memes/models/meme-with-url.model';

@Injectable()
export class MemeService {
  private readonly deliveryHost: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configuration: ConfigService<ConfigurationVariables>,
  ) {
    this.deliveryHost =
      this.configuration.get<ImportConfig>('import').deliveryHost;
  }

  async bulkInsertMemes(
    payload: Omit<MemeModel, 'id'>[],
  ): Promise<{ count: number }> {
    return this.prismaService.meme.createMany({
      data: payload,
      skipDuplicates: true,
    });
  }

  async getNewMemes(payload: { userId: string }): Promise<MemeWithUrlModel[]> {
    const { userId } = payload;
    const ratedMemes = await this.prismaService.ratedMemes.findFirst({
      where: {
        userId,
      },
    });
    return this.prismaService.meme
      .findMany({
        where: {
          NOT: {
            id: { in: [...ratedMemes.liked, ...ratedMemes.disliked] },
          },
        },
        take: 10,
      })
      .then((items) =>
        items.map((item) => memeToMemeWithUrlDto(item, this.deliveryHost)),
      );
  }

  async rateMeme(payload: {
    userId: string;
    likedMemeIds: string[];
    dislikedMemeIds: string[];
  }): Promise<void> {
    const { dislikedMemeIds, likedMemeIds, userId } = payload;
    const ratedMemes = await this.prismaService.ratedMemes.findFirst({
      where: {
        userId,
      },
    });
    await this.prismaService.ratedMemes.update({
      where: {
        userId,
      },
      data: {
        liked: [...ratedMemes.liked, ...likedMemeIds],
        disliked: [...ratedMemes.disliked, ...dislikedMemeIds],
      },
    });
  }
}
