import { Injectable } from '@nestjs/common';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';

@Injectable()
export class RideRequestService {
  create(createRideRequestDto: CreateRideRequestDto) {
    return 'This action adds a new rideRequest';
  }

  findAll() {
    return `This action returns all rideRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rideRequest`;
  }

  update(id: number, updateRideRequestDto: UpdateRideRequestDto) {
    return `This action updates a #${id} rideRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} rideRequest`;
  }
}
