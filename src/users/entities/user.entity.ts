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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES, array: true, default: [ROLES.USER] })
  roles: ROLES[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @CreateDateColumn()
  updatedAt: Timestamp;
}
