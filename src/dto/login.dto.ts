import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'USERNAME_IS_REQUIRED',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'PASSWORD_IS_REQUIRED',
  })
  password: string;
}
