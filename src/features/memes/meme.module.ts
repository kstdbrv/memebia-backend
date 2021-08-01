import { AuthModule } from '@features/auth/auth.module';
import { CommonModule } from '@features/common/common.module';
import { MemeController } from '@features/memes/controllers/meme.controller';
import { MemeService } from '@features/memes/services/meme/meme.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [MemeController],
  providers: [MemeService],
  exports: [MemeService],
})
export class MemeModule {}
