import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateAdminPageDto {
  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  permissionIds: number[];

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: 'text', nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ nullable: true })
  @IsString()
  @IsOptional()
  icon: string;

  @ApiPropertyOptional({ nullable: true })
  @IsString()
  @IsOptional()
  url: string;

  @ApiPropertyOptional({ nullable: true })
  @IsString()
  @IsOptional()
  route_name: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  childrenIds: number[];

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  parentId: number;

  @ApiHideProperty()
  user: any;
}
