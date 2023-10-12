import { Test, TestingModule } from '@nestjs/testing';
import { QuestionerService } from './questioner.service';

describe('QuestionerService', () => {
  let service: QuestionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionerService],
    }).compile();

    service = module.get<QuestionerService>(QuestionerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
