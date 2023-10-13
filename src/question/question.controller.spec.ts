import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { request } from 'http';
import { HttpException, INestApplication } from '@nestjs/common';

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question), // Mock the repository token
          useClass: Repository, // Use the actual Repository class
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return an array of items', async () => {
    // Mock the service method's return value
    const mockedItems: any[] = [{ id: 1, question: 'Item 1' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockedItems);
    const result = await controller.findAll();
    expect(result).toEqual(mockedItems);
  });

  it('should return 201 on successful creation', async () => {
    const mockCreatedData: any = { question: 'Mock Data' };

    // Mock the behavior of myService.create
    jest.spyOn(service, 'create').mockResolvedValue(mockCreatedData);

    const result = await controller.create(mockCreatedData);

    // Ensure the controller returns the expected response
    expect(result).toEqual(mockCreatedData);
  });

  it('should return 500', async () => {
    const mockError = new Error('Create failed');
    jest.spyOn(service, 'create').mockRejectedValue(mockError);
    try {
      const createDto: CreateQuestionDto = { question: '', type: 0 };
      await controller.create(createDto);
    } catch (e) {
      // The HttpException object contains the status code
      expect(e).toBeInstanceOf(HttpException);
      expect(e.getStatus()).toBe(500);
    }
  });
});
