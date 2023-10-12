import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  create(question: Partial<Question>): Promise<Question> {
    const quest = this.questionRepository.create(question);
    if (!quest) throw new Error('Create failed');
    return this.questionRepository.save(quest);
  }

  findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionRepository.findOne({ where: { id } });
  }

  async update(id: number, question: Partial<Question>): Promise<Question> {
    const post = await this.questionRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error('Post not found');
    }
    Object.assign(post, question);
    return this.questionRepository.save(post);
  }

  remove(id: number): boolean {
    if (this.questionRepository.delete(id)) return true;

    return false;
  }
}
