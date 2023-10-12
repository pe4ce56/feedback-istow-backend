import { Test, TestingModule } from '@nestjs/testing';
import { QuestionerController } from './questioner.controller';
import { QuestionerService } from './questioner.service';

describe('QuestionerController', () => {
  let controller: QuestionerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionerController],
      providers: [QuestionerService],
    }).compile();

    controller = module.get<QuestionerController>(QuestionerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
