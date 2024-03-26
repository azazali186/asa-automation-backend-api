import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SocialMediaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'FB_IS_STRING',
  })
  fb: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'TG_IS_STRING',
  })
  tg: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'WA_IS_STRING',
  })
  wa: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: 'EMAIL_IS_STRING',
  })
  email: string;
}
