import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../roles/user.roles.enum';
import { DeepPartial } from 'typeorm/common/DeepPartial';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ enum: [Role.ADMIN, Role.DRIVER, Role.RIDER] })
  @IsEnum(Role)
  role: DeepPartial<Role>;
}
