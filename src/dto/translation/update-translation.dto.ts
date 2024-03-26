import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateTranslationDto {
  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'NAME_IS_STRING',
  })
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'LANGUAGE_CODE_IS_STRING',
  })
  language_code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'DESCRIPTION_IS_STRING',
  })
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'META_TITLE_IS_STRING',
  })
  meta_title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'META_KEYWORD_IS_STRING',
  })
  meta_keywords: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'META_DESCRIPTION_IS_STRING',
  })
  meta_descriptions: string;
}
