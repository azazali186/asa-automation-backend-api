import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImagesDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiHideProperty()
  user: any;
}
