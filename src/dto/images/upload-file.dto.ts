import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsArray } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Object)
  files: any[];

  @ApiHideProperty()
  user: any;
}
