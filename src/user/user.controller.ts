import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LogInDTO } from './dto/create-user.dto';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { Public } from 'src/user/auth.decorator';
import { checkPassword, hashPassword } from './utils/utils';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserRequestDto } from 'src/ride_request/dto/update-driver_request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary:
      'Adds a user to the system. A user falls under the following roles; admin, rider, driver.',
  })
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

  @ApiOperation({
    summary: 'Retrieves all users and their respective data',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary:
      'Sets the availability of driver as false/true. Inavailable drivers are unable to accept rides',
  })
  @Patch('driver-availability')
  async update(@Body() driverData: UpdateUserRequestDto) {
    const driver = await this.userService.findOne(driverData.driverId);
    if (!driver) {
      throw new BadRequestException('Driver does not exist');
    }

    driver.isActive = !driver.isActive;
    await this.userService.update(driver);

    return {
      msg: `Driver availability is ${driver.isActive}`,
    };
  }

  @ApiOperation({
    summary: 'Provides a valid jwt token upon user login.',
  })
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
