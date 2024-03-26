import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateImagesDto {
  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  url: string;

  @ApiHideProperty()
  user: any;
}
