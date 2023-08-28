import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../roles/user.roles.enum';

@Entity()
@Unique(['phoneNumber'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;
}
