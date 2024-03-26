/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchPermissionDto {
  @ApiPropertyOptional()
  @IsOptional()
  search: string;
}
