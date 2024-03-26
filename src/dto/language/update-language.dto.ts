import { IsOptional, IsString } from 'class-validator';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateLanguageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'NAME_IS_STRING',
  })
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'CODE_IS_STRING',
  })
  code: string;

  @ApiHideProperty()
  user: any;
}
