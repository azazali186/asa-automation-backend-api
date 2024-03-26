import { IsOptional, IsString } from 'class-validator';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateCurrencyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'NAME_IS_STRING',
  })
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'SYMBOL_IS_STRING',
  })
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'SYMBOL_IS_STRING',
  })
  symbol: string;

  @ApiHideProperty()
  user: any;
}
