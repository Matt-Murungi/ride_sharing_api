import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRideRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  pickupLocation: string;

  @ApiProperty()
  @IsNotEmpty()
  destination: string;
}
