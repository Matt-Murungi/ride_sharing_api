import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LogInDTO } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { checkPassword, hashPassword } from './utils/utils';
import { QueryFailedError } from 'typeorm';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginData: LogInDTO) {
    const user = await this.userService.findOneByEmail(loginData.email);

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!(await checkPassword(loginData.password, user.password))) {
      throw new BadRequestException('Invalid Password');
    }

    const payload = { id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Public()
  @Post('register')
  async register(@Body() registerData: CreateUserDto) {
    try {
      registerData.password = hashPassword(registerData.password);
      const user = await this.userService.createUser(registerData);

      const payload = { id: user.id };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error['detail'].includes('email')) {
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        } else if (error['detail'].includes('phoneNumber')) {
          throw new HttpException(
            'Phone number already exists',
            HttpStatus.CONFLICT,
          );
        }
      } else {
        throw new HttpException(
          'Something is wrong, try again later',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
