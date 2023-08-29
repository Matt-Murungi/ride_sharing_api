import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RideStatus } from './ride.status.enum';

@Entity()
@Unique(['phoneNumber'])
@Unique(['email'])
export class RideRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => User)
  driver: User;

  @Column({ type: 'varchar', length: 30 })
  pickupLocation: string;

  @Column({ type: 'varchar', length: 40 })
  destination: string;

  @Column({
    type: 'enum',
    enum: RideStatus,
  })
  status: RideStatus;
}
