import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';

export class DeleteFilesDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNotEmpty()
  ids: number[];

  @ApiHideProperty()
  user: any;
}
