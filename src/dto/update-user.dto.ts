import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsNumber,
  IsIn,
} from 'class-validator';
import { CommonStatus } from 'src/enum/common-status.enum';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString({
    message: 'INVALID_FORMAT_USERNAME',
  })
  @MaxLength(20, {
    message: 'MAX_LENGTH_USERNAME_ERROR',
  })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'INVALID_FORMAT_USERNAME',
  })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'INVALID_FORMAT_PASSWORD',
  })
  @MinLength(6, {
    message: 'MIN_LENGTH_PASSWORD_ERROR',
  })
  @Matches(/^(?=.*?[A-Za-z])(?=.*?[0-9]).*$/, {
    message: 'INVALID_FORMAT_PASSWORD',
  })
  password?: string;

  @ApiPropertyOptional()
  @IsString({
    message: 'INVALID_NAME',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  roleId?: number;

  @ApiPropertyOptional()
  @IsString({
    message: 'MOBILE_NUMBER_IS_REQUIRED',
  })
  @Matches(/^[0-9]+$/, {
    message: 'INVALID_MOBILE_NUMBER',
  })
  @MaxLength(12, {
    message: 'MAX_LENGHT_MOBILE_NUMBER_ERROR',
  })
  @IsOptional()
  mobileNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE], {
    message: 'INVALID_STATUS_ACTIVE_INACTIVE',
  })
  status: CommonStatus;

  @ApiPropertyOptional()
  @IsString({
    message: 'INVALID_TELEGRAM_ID',
  })
  telegram_id: string;

  @ApiHideProperty()
  user: any;
}
