import { Test, TestingModule } from '@nestjs/testing';
import { OredersService } from '../orders.service';

describe('OredersService', () => {
  let service: OredersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OredersService],
    }).compile();

    service = module.get<OredersService>(OredersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
