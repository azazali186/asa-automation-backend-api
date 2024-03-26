import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { AdminPageChildrenDto } from './admin-page-children.dto';

export class AdminPagePermissionsDto {
  @ApiProperty()
  @IsNumber()
  adminPageId: number;

  @ApiProperty()
  @IsArray()
  children: AdminPageChildrenDto[];
}
