import { Module } from '@nestjs/common';
import { RideRequestService } from './ride_request.service';
import { RideRequestController } from './ride_request.controller';

@Module({
  controllers: [RideRequestController],
  providers: [RideRequestService],
})
export class RideRequestModule {}
