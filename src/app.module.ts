import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DBConfig } from './config/db.connection';
import { JwtSettings } from './config/jwt.utils';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DBConfig, JwtSettings, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
