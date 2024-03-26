/* eslint-disable prettier/prettier */
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { UserStatus } from 'src/enum/user-status.enum';
import { SearchBaseDto } from './search-base-dto';

export class SearchUserDto extends SearchBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsIn([UserStatus.ACTIVE, UserStatus.INACTIVE])
  status: UserStatus;

  @ApiPropertyOptional()
  @IsOptional()
  search: string;

  @ApiHideProperty()
  role: string;
}
