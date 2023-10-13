import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';

describe('QuestionService', () => {
  let service: QuestionService;
  let repository: Repository<Question>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question), // Mock the repository token
          useClass: Repository, // Use the actual Repository class
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    repository = module.get<Repository<Question>>(getRepositoryToken(Question));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all questions', async () => {
    // Mock the repository method
    const mockedQuestions: any[] = [
      { id: 1, question: 'Item 1', type: 1 },
      { id: 2, question: 'Item 1', type: 1 },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(mockedQuestions);

    // Call the service method
    const result = await service.findAll();

    // Verify the result
    expect(result).toEqual(mockedQuestions);
  });
});
