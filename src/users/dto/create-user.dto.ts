import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUserDTO } from './login-user.dto';

export class CreateUserDto extends LoginUserDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name should be string' })
  name: string;
}
