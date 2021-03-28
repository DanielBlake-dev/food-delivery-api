import { Test, TestingModule } from '@nestjs/testing';
import { OredersController } from '../orders.controller';

describe('OredersController', () => {
  let controller: OredersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OredersController],
    }).compile();

    controller = module.get<OredersController>(OredersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
