import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthGuard } from './auth.guard';
import { JwtSettings } from 'src/config/jwt.utils';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), JwtSettings],
  exports: [UserService],
})
export class UserModule {}
