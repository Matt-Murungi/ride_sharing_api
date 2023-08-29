import { PartialType } from '@nestjs/mapped-types';
import { CreateRideRequestDto } from './create-ride_request.dto';

export class UpdateRideRequestDto extends PartialType(CreateRideRequestDto) {}
