import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  driverId: string;
}
