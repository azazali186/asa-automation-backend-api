import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';
import { SearchBaseDto } from '../search-base-dto';
import { CarrierTypes } from 'src/enum/carrier-types.enum';
import { IncotermsTypes } from 'src/enum/incoterms.enum';

export class SearchCarrierDto extends SearchBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  type: CarrierTypes;

  @ApiPropertyOptional()
  @IsOptional()
  supported_incoterms: IncotermsTypes;

  @ApiHideProperty()
  user: any;
}
