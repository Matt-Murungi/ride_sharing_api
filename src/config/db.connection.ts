import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

export const DBConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db.smbzcznxcrzevxbpkvhc.supabase.co',
  port: 5432,
  password: 'ride_sharing_db',
  username: 'postgres',
  entities: [User],
  database: 'postgres',
  synchronize: false,
  logging: true,
});
