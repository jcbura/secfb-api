import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ type: String, example: 'admin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
