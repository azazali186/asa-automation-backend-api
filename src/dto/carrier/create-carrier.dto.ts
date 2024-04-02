import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  ArrayNotEmpty,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { CarrierTypes } from 'src/enum/carrier-types.enum';
import { IncotermsTypes } from 'src/enum/incoterms.enum';

export class CreateCarrierDto {
  @ApiProperty()
  @IsString({
    message: 'NAME_IS_STRING',
  })
  @IsNotEmpty({
    message: 'NAME_IS_REQUIRED',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'CODE_IS_STRING',
  })
  @IsNotEmpty({
    message: 'CODE_IS_REQUIRED',
  })
  code: string;

  @ApiProperty()
  @IsString({
    message: 'LOCATION_IS_STRING',
  })
  @IsNotEmpty({
    message: 'LOCATION_IS_REQUIRED',
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
  @ArrayNotEmpty()
  type: CarrierTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @ArrayNotEmpty()
  supported_incoterms: IncotermsTypes;

  @ApiHideProperty()
  user: any;
}
