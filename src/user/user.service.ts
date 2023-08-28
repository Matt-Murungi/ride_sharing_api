import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const response = await this.userRepository.save(createUserDto);
      return response;
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
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findUserByPhoneNumber(phoneNumber: String) {
    return `This action returns a #${phoneNumber} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
