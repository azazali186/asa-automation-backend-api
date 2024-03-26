import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchBaseDto {
  @ApiPropertyOptional({
    description: 'Example:2023-11-09 00:00:00,2023-11-11 23:59:59',
  })
  createdDate: string;

  @ApiPropertyOptional({ default: 10 })
  limit: number;

  @ApiPropertyOptional({ default: 0 })
  offset: number;

  @ApiHideProperty()
  user: any;
}
