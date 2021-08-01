import { ConfigurationVariables } from '@config/configuration.model';
import { ContextUser } from '@features/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { AuthService } from '@features/auth/services/auth/auth.service';
import { MemeDetailsOutputDto } from '@features/memes/dto/meme-details.output.dto';
import { NextMemesOutputDto } from '@features/memes/dto/next-memes.output.dto';
import { RateMemesInputDto } from '@features/memes/dto/rate-memes.input.dto';
import { MemeService } from '@features/memes/services/meme/meme.service';
import { User } from '@features/users/models/user.model';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('memes')
@ApiTags('memes')
export class MemeController {
  private readonly logger = new Logger(MemeController.name);

  constructor(private readonly memeService: MemeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/next')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Return next memes array',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns next memes array',
    type: NextMemesOutputDto,
  })
  @ApiBearerAuth()
  async nextMemes(@ContextUser() user: User): Promise<NextMemesOutputDto> {
    this.logger.log('nextMemes');
    const nextMemes = await this.memeService.getNewMemes({
      userId: user.id,
    });
    return {
      memes: nextMemes,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Return meme details',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns meme details',
    type: NextMemesOutputDto,
  })
  @ApiBearerAuth()
  async getMemeDetails(
    @Param('id') memeId,
    @ContextUser() user: User,
  ): Promise<MemeDetailsOutputDto> {
    this.logger.log('getMemeDetails');
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Mark memes as rated',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Memes marked successful',
  })
  @ApiBearerAuth()
  async rateMemes(
    @Body() data: RateMemesInputDto,
    @ContextUser() user: User,
  ): Promise<void> {
    await this.memeService.rateMeme({
      userId: user.id,
      likedMemeIds: data.likedMemes,
      dislikedMemeIds: data.dislikedMemes,
    });
  }
}
