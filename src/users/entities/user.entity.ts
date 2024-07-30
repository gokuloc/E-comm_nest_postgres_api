import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from 'src/utilities/common/user-roles-enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: ROLES, array: true, default: [ROLES.USER] })
  roles: ROLES[];

  // @ApiProperty()
  @CreateDateColumn()
  createdAt: Timestamp;

  // @ApiProperty()
  @CreateDateColumn()
  updatedAt: Timestamp;
}
