import { ApiProperty } from '@nestjs/swagger';
import { MemeWithUrlModel } from '@features/memes/models/meme-with-url.model';

export class NextMemesOutputDto {
  @ApiProperty({})
  memes: MemeWithUrlModel[];
}
