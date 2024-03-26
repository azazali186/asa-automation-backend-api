import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty()
  @IsString({
    message: 'NAME_IS_STRING',
  })
  @IsNotEmpty({
    message: 'NAME_IS_REQUIRED',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'DESCRIPTION_IS_STRING',
  })
  @IsNotEmpty({
    message: 'DESCRIPTION_IS_REQUIRED',
  })
  description: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'PERMISSION_IS_REQUIRED',
  })
  @IsArray({
    message: 'PERMISSION_IS_ARRAY',
  })
  permissions: number[];

  @ApiHideProperty()
  user: any;
}
