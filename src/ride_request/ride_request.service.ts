import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: string) {
    return await this.rideRepository.findOneBy({ id });
  }

  async update(rideRequest: RideRequest) {
    return await this.rideRepository.update(rideRequest.id, {
      ...rideRequest,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} rideRequest`;
  }
}
