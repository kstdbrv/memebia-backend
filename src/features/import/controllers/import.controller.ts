import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImportService } from '@features/import/services/import/import.service';
import { ImportInputDto } from '@features/import/dto/import.input.dto';

@Controller('import')
@ApiTags('import')
export class ImportController {
  private readonly logger = new Logger(ImportController.name);

  constructor(private readonly importService: ImportService) {}

  @Post('/import')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Import memes',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Import success',
  })
  async exportMemes(@Body() body: ImportInputDto): Promise<void> {
    this.logger.log('exportMemes');
    await this.importService.autoImportFromAWS(body.path);
  }
}
