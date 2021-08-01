import { Injectable, Logger } from '@nestjs/common';
import {
  TelegramExportData,
  TelegramMessage,
} from '@features/import/models/telegram-source';
import { MemeService } from '@features/memes/services/meme/meme.service';
import { telegramToNewMeme } from '@features/import/dto/telegram-to-meme';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  ImportConfig,
} from '@config/configuration.model';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);
  private readonly deliveryHost: string;

  constructor(
    private readonly memeService: MemeService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<ConfigurationVariables>,
  ) {
    this.deliveryHost =
      this.configService.get<ImportConfig>('import').deliveryHost;
  }

  autoImportFromAWS(filePath: string) {
    this.logger.log('Auto import from AWS. filePath: ' + filePath);
    this.httpService
      .get<TelegramExportData>(`${this.deliveryHost}/${filePath}`)
      .subscribe((response) => {
        if (response.data.id) {
          return this.importFromTelegram(
            response.data.id,
            response.data.messages,
          );
        }
      });
  }

  private async importFromTelegram(
    channelId: string,
    messages: TelegramMessage[],
  ): Promise<void> {
    this.logger.log(
      `Start import from telegram channelId = ${channelId}, messagesCount = ${messages.length}`,
    );
    const newMemes = messages
      .map((message) => telegramToNewMeme(channelId, message))
      .filter(Boolean);
    const { count } = await this.memeService.bulkInsertMemes(newMemes);
    this.logger.log(
      `Finish import from telegram channelId = ${channelId}}. Memes imported count = ${count}`,
    );
  }
}
