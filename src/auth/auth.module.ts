import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtSettings } from 'src/config/jwt.utils';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule, JwtSettings],
  controllers: [AuthController],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  // ],
})
export class AuthModule {}
