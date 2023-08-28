import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

const dbModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db.smbzcznxcrzevxbpkvhc.supabase.co',
  port: 5432,
  password: 'ride_sharing_db',
  username: 'postgres',
  entities: [User],
  database: 'postgres',
  synchronize: true,
  logging: true,
});

@Module({
  imports: [dbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
