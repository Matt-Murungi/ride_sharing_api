import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { RideRequest } from '../ride_request/entities/ride_request.entity';

export const DBConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db.smbzcznxcrzevxbpkvhc.supabase.co',
  port: 5432,
  password: 'ride_sharing_db',
  username: 'postgres',
  entities: [User, RideRequest],
  database: 'postgres',
  synchronize: false,
  logging: true,
});
