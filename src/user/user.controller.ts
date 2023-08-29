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
import { checkPassword, hashPassword } from './utils/utils';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserRequestDto } from 'src/ride_request/dto/update-driver_request.dto';

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
      createUserDto.password = hashPassword(createUserDto.password);
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

  @Patch('driver-availability')
  async update(@Body() driverData: UpdateUserRequestDto) {
    const driver = await this.userService.findOne(driverData.driverId);

    if (!driver) {
      throw new BadRequestException('Driver does not exist');
    }
    if (driverData.isActive) {
      driver.isActive = true;
    } else {
      driver.isActive = false;
    }

    return await this.userService.update(driver);
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
