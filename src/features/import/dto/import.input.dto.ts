import { ApiProperty } from '@nestjs/swagger';

export class ImportInputDto {
  @ApiProperty({
    example: 'telegram/channels/1307403883/result.json',
  })
  path: string;
}
