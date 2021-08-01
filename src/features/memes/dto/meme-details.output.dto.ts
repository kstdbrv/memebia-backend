import { ApiProperty } from '@nestjs/swagger';

export class MemeDetailsOutputDto {
  @ApiProperty({
    example: '12',
  })
  id: string;

  @ApiProperty()
  imageUrl: string;
}
