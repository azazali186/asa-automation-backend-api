import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'INVALID_FORMAT_USERNAME',
  })
  @IsNotEmpty({
    message: 'USERNAME_IS REQUIRED',
  })
  username: string;

  @ApiProperty()
  @IsString({
    message: 'INVALID_FORMAT_PASSWORD',
  })
  @MinLength(6, {
    message: 'MIN_LENGTH_PASSWORD_ERROR',
  })
  @Matches(/^(?=.*?[A-Za-z])(?=.*?[0-9]).*$/, {
    message: 'INVALID_FORMAT_PASSWORD',
  })
  @IsNotEmpty({
    message: 'PASSWORD_IS REQUIRED',
  })
  password: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({
    message: 'ROLE_ID_IS_REQUIRED',
  })
  roleId: number;

  @ApiProperty()
  @IsString({
    message: 'MOBILE_NUMBER_IS_REQUIRED',
  })
  @Matches(/^[0-9]+$/, {
    message: 'INVALID_MOBILE_NUMBER',
  })
  @MaxLength(12, {
    message: 'MAX_LENGHT_MOBILE_NUMBER_ERROR',
  })
  @IsNotEmpty({
    message: 'MOBILE_NUMBER_IS_REQUIRED',
  })
  mobileNumber: string;

  @ApiPropertyOptional()
  @IsString({
    message: 'INVALID_TELEGRAM_ID',
  })
  telegram_id: string;

  @ApiHideProperty()
  user: any;
}
