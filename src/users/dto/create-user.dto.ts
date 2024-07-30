import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUserDTO } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends LoginUserDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name should be string' })
  @ApiProperty({ required: true })
  name: string;
}
