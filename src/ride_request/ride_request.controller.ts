import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RideRequestService } from './ride_request.service';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';

@Controller('ride-request')
export class RideRequestController {
  constructor(private readonly rideRequestService: RideRequestService) {}

  @Post()
  create(@Body() createRideRequestDto: CreateRideRequestDto) {
    return this.rideRequestService.create(createRideRequestDto);
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
  update(@Param('id') id: string, @Body() updateRideRequestDto: UpdateRideRequestDto) {
    return this.rideRequestService.update(+id, updateRideRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideRequestService.remove(+id);
  }
}
