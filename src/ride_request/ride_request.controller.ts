import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { RideRequestService } from './ride_request.service';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';
import { UserService } from 'src/user/user.service';
import { RideRequest } from './entities/ride_request.entity';
import { RideStatus } from './entities/ride.status.enum';

@Controller('ride-request')
export class RideRequestController {
  constructor(
    private readonly rideRequestService: RideRequestService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createRide(@Body() createRideRequestData: CreateRideRequestDto) {
    const user = await this.userService.findOne(createRideRequestData.userId);
    console.log("User", user);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const payload = new RideRequest();
    payload.user = user;
    payload.destination = createRideRequestData.destination;
    payload.pickupLocation = createRideRequestData.pickupLocation;
    payload.status = RideStatus.PENDING;

    const ride = await this.rideRequestService.create(payload);

    return ride;
  }

  @Get()
  findAll() {
    return this.rideRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rideRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRideRequestDto: UpdateRideRequestDto,
  ) {
    return this.rideRequestService.update(+id, updateRideRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideRequestService.remove(+id);
  }
}
