import { Test, TestingModule } from '@nestjs/testing';
import { MvloggingService } from './mvlogging.service';

describe('MvloggingService', () => {
  let service: MvloggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MvloggingService],
    }).compile();

    service = module.get<MvloggingService>(MvloggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
