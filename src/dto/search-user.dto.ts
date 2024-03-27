/* eslint-disable prettier/prettier */
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { SearchBaseDto } from './search-base-dto';
import { CommonStatus } from 'src/enum/common-status.enum';

export class SearchUserDto extends SearchBaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsIn([CommonStatus.ACTIVE, CommonStatus.INACTIVE])
  status: CommonStatus;

  @ApiPropertyOptional()
  @IsOptional()
  search: string;

  @ApiHideProperty()
  role: string;
}
