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
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/roles/user.roles.enum';

@ApiTags('Auth')
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
}
