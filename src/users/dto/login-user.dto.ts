import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Password can not be empty' })
  @MinLength(6, { message: 'Password minimum character should be 6' })
  password: string;
}
