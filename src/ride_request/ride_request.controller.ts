import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RideRequestService } from './ride_request.service';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';
import { UserService } from 'src/user/user.service';
import { RideRequest } from './entities/ride_request.entity';
import { RideStatus } from './entities/ride.status.enum';
import { QueryFailedError } from 'typeorm';
import { Role } from 'src/user/roles/user.roles.enum';
import { DriverRideAssignmentDto } from './dto/assign-driver_ride_request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ride')
@Controller('ride')
export class RideRequestController {
  constructor(
    private readonly rideRequestService: RideRequestService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary:
      'Allows users to create rides and assigns the ride status as pending. Only a user assigned as a rider is able to create a ride',
  })
  @Post()
  async createRide(@Body() createRideRequestData: CreateRideRequestDto) {
    try {
      const user = await this.userService.findOne(createRideRequestData.userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.role == Role.DRIVER) {
        throw new BadRequestException(
          'Driver not allowed to create ride request',
        );
      }

      const payload = new RideRequest();
      payload.user = user;
      payload.destination = createRideRequestData.destination;
      payload.pickupLocation = createRideRequestData.pickupLocation;
      payload.status = RideStatus.PENDING;

      const ride = await this.rideRequestService.create(payload);

      return ride;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException('Records already Exist', HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          'Something is wrong, try again later',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({
    summary: 'Retrieves all rides in the system including their statuses',
  })
  @Get()
  findAll() {
    return this.rideRequestService.findAll();
  }

  @ApiOperation({
    summary:
      'Allows driver to accept/reject rides. Only a user assigned as a driver and set as available is able to accept rides',
  })
  @Patch('accept-reject')
  async assignDriverToRide(@Body() driverRequestData: DriverRideAssignmentDto) {
    const ride = await this.rideRequestService.findOne(
      driverRequestData.rideId,
    );

    if (!ride) {
      throw new BadRequestException('Ride does not exist');
    }

    const driver = await this.userService.findOne(driverRequestData.driverId);

    if (!driver) {
      throw new BadRequestException('Driver does not exist');
    }

    if (driver.role != Role.DRIVER) {
      throw new BadRequestException('The user is not a driver');
    }

    if (driver.isOnTrip && ride.status != RideStatus.ACCEPTED) {
      throw new BadRequestException('Driver is already on trip');
    }

    if (!driver.isActive) {
      throw new BadRequestException('Driver is not available');
    }

    ride.driver = driver;

    if (
      driverRequestData.status == RideStatus.ACCEPTED ||
      driverRequestData.status == RideStatus.CANCELLED
    ) {
      if (driverRequestData.status == RideStatus.ACCEPTED) {
        ride.status = RideStatus.ACCEPTED;
        driver.isOnTrip = true;
        await this.userService.update(driver);
      } else {
        ride.status = RideStatus.CANCELLED;
        driver.isOnTrip = false;
        await this.userService.update(driver);
      }
    } else {
      throw new BadRequestException('You can only accept/cancel ride');
    }

    return await this.rideRequestService.update(ride);
  }

  @ApiOperation({
    summary:
      'Updates ride status under the following categories [pending, accepted, completed, cancelled]',
  })
  @Patch('status')
  async updateRideStatus(@Body() updateRideRequestData: UpdateRideRequestDto) {
    const ride = await this.rideRequestService.findOne(
      updateRideRequestData.rideId,
    );

    if (!ride) {
      throw new BadRequestException('Ride does not exist');
    }

    ride.status = updateRideRequestData.status;

    return await this.rideRequestService.update(ride);
  }
}
