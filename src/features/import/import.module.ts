import { CommonModule } from '@features/common/common.module';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ImportService } from '@features/import/services/import/import.service';
import { ImportController } from '@features/import/controllers/import.controller';
import { MemeModule } from '@features/memes/meme.module';

@Module({
  imports: [CommonModule, HttpModule, MemeModule],
  controllers: [ImportController],
  providers: [ImportService],
  exports: [ImportService],
})
export class ImportModule {}
