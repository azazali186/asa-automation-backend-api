import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CarrierTypes } from 'src/enum/carrier-types.enum';
import { IncotermsTypes } from 'src/enum/incoterms.enum';
export class UpdateCarrierDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'LOCATION_IS_STRING',
  })
  location: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'WEBSITE_IS_STRING',
  })
  website: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'TELEGRAM_IS_STRING',
  })
  telephone: string;

  @ApiPropertyOptional()
  @IsOptional()
  type: CarrierTypes;

  @ApiPropertyOptional()
  @IsOptional()
  supported_incoterms: IncotermsTypes;

  @ApiPropertyOptional()
  @IsOptional()
  status: boolean;

  @ApiHideProperty()
  user: any;
}
