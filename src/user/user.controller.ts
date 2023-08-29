import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LogInDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/user/auth.decorator';
import { checkPassword } from './utils/utils';
import { JwtService } from '@nestjs/jwt';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return user;
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

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  findUser(@Request() req) {
    return req.user;
    // return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

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
