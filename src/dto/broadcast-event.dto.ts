import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class BroadcastEventDto {
  @ApiProperty()
  event: string;

  @ApiProperty()
  data: any;

  @ApiHideProperty()
  user: any;
}
