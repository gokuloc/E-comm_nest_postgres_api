import { ROLES } from 'src/utilities/common/user-roles-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES, array: true, default: [ROLES.USER] })
  roles: ROLES[];
}
