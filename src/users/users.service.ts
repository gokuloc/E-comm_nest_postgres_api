import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare, genSalt } from 'bcryptjs';
import { LoginUserDTO } from './dto/login-user.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const isUserExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (isUserExists) {
      throw new BadRequestException('This email is already registered.');
    }

    const salt = await genSalt();
    createUserDto.password = await hash(createUserDto.password, salt);
    const userData = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(userData);
    delete savedUser.password;
    return savedUser;
  }

  async login(loginUserDto: LoginUserDTO): Promise<User> {
    const isUserExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: loginUserDto.email })
      .getOne();

    if (!isUserExists) throw new BadRequestException('Bad Credentials');

    const isPasswordMatch = await compare(
      loginUserDto.password,
      isUserExists.password,
    );

    if (!isPasswordMatch) throw new BadRequestException('Bad Credential');

    delete isUserExists.password;
    return isUserExists;
  }

  async accessToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };
    // Generate JWT token
    return sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
