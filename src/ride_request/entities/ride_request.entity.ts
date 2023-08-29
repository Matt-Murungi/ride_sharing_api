import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RideStatus } from './ride.status.enum';

@Entity()
export class RideRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
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
