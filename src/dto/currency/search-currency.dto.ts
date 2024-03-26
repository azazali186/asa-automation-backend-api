import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SearchBaseDto } from '../search-base-dto';

export class SearchCurrencyDto extends SearchBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  symbol: string;

  @ApiHideProperty()
  user: any;
}
