import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { RideStatus } from '../entities/ride.status.enum';

export class DriverRideAssignmentDto {
  @ApiProperty()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({
    enum: [RideStatus.ACCEPTED, RideStatus.CANCELLED],
  })
  @IsEnum(RideStatus)
  status: DeepPartial<RideStatus>;
}
