import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { RideStatus } from '../entities/ride.status.enum';
import { DeepPartial } from 'typeorm';

export class UpdateRideRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({
    enum: [
      RideStatus.ACCEPTED,
      RideStatus.CANCELLED,
      RideStatus.COMPLETED,
      RideStatus.PENDING,
    ],
  })
  @IsEnum(RideStatus)
  status: DeepPartial<RideStatus>;
}
