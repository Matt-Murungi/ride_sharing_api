import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';
import { RideRequest } from './entities/ride_request.entity';

@Injectable()
export class RideRequestService {
  constructor(
    @InjectRepository(RideRequest)
    private rideRepository: Repository<RideRequest>,
  ) {}

  async create(rideRequest: RideRequest): Promise<RideRequest> {
    return await this.rideRepository.save(rideRequest);
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
