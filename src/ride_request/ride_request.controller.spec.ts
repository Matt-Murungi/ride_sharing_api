import { Test, TestingModule } from '@nestjs/testing';
import { RideRequestController } from './ride_request.controller';
import { RideRequestService } from './ride_request.service';

describe('RideRequestController', () => {
  let controller: RideRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideRequestController],
      providers: [RideRequestService],
    }).compile();

    controller = module.get<RideRequestController>(RideRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
