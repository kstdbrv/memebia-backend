import { ApiProperty } from '@nestjs/swagger';

export class RateMemesInputDto {
  @ApiProperty({
    example: "['1', '2']",
  })
  likedMemes: string[];

  @ApiProperty({
    example: "['3', '4']",
  })
  dislikedMemes: string[];
}
