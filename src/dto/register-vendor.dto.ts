import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateShopDto } from './shop/create-shop.dto';

export class RegisterVendorDto extends CreateShopDto {
  @ApiProperty()
  @IsString({
    message: 'INVALID_NAME',
  })
  @IsNotEmpty({
    message: 'NAME_IS REQUIRED',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'INVALID_FORMAT_USERNAME',
  })
  @MaxLength(20, {
    message: 'MAX_LENGTH_USERNAME_ERROR',
  })
  username: string;

  @ApiProperty()
  @IsString({
    message: 'INVALID_FORMAT_PASSWORD',
  })
  @MinLength(6, {
    message: 'MIN_LENGTH_PASSWORD_ERROR',
  })
  password: string;

  @ApiProperty()
  @IsString({
    message: 'MOBILE_NUMBER_IS_REQUIRED',
  })
  @MaxLength(20, {
    message: 'MAX_LENGHT_MOBILE_NUMBER_ERROR',
  })
  @IsNotEmpty({
    message: 'MOBILE_NUMBER_IS_REQUIRED',
  })
  mobileNumber: string;
}
