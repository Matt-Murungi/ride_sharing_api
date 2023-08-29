import { Module } from '@nestjs/common';
import { RideRequestService } from './ride_request.service';
import { RideRequestController } from './ride_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideRequest } from './entities/ride_request.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RideRequest]), UserModule],
  controllers: [RideRequestController],
  providers: [RideRequestService],
})
export class RideRequestModule {}
