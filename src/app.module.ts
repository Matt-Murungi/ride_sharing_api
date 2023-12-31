import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBConfig } from './config/db.connection';
import { JwtSettings } from './config/jwt.utils';
import { RideRequestModule } from './ride_request/ride_request.module';

@Module({
  imports: [DBConfig, JwtSettings, UserModule, RideRequestModule],
})
export class AppModule {}
