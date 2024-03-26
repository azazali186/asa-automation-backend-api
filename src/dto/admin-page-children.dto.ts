import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class AdminPageChildrenDto {
  @ApiProperty()
  @IsNumber()
  childrenId: number;

  @ApiProperty()
  @IsArray({
    message: 'PERMISSION_IS_ARRAY',
  })
  permissions: number[];
}
