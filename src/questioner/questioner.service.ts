import { Injectable } from '@nestjs/common';
import { CreateQuestionerDto } from './dto/create-questioner.dto';
import { UpdateQuestionerDto } from './dto/update-questioner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questioner } from './entities/questioner.entity';
import { Repository } from 'typeorm';
import { Customers } from './entities/customer.entity';
import { Question } from './../question/entities/question.entity';

@Injectable()
export class QuestionerService {
  constructor(
    @InjectRepository(Questioner)
    private questionerRepository: Repository<Questioner>,
    @InjectRepository(Customers)
    private customerRepository: Repository<Customers>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  createCustomer(customer: Partial<Customers>): Promise<Customers> {
    const cust = this.customerRepository.create(customer);

    if (!cust) throw new Error('Create failed');
    return this.customerRepository.save(cust);
  }
  create(questioner: Partial<Questioner>[]): Promise<Questioner[]> {
    return this.questionerRepository.save(questioner);
  }
  findAll(): Promise<Customers[]> {
    return this.customerRepository.find({
      relations: {
        questioners: {
          question: true,
        },
        instance: true,
      },
    });
  }

  respondents(start: Date, end: Date): Promise<any[]> {
    return this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questioners', 'questioner')
      .leftJoinAndSelect('questioner.customer', 'customer')
      .andWhere('questioner.created_at >= :startDate', {
        startDate: start,
      })
      .andWhere('questioner.created_at <= :endDate', {
        endDate: end,
      })
      .getMany();
  }

  findOne(id: number): Promise<Customers> {
    return this.customerRepository.findOne({
      where: { id },
      relations: {
        questioners: {
          question: true,
        },
      },
    });
  }

  // async update(id: number, question: Partial<Questioner>): Promise<Questioner> {
  //   const post = await this.questionerRepository.findOne({ where: { id } });
  //   if (!post) {
  //     throw new Error('Post not found');
  //   }
  //   Object.assign(post, question);
  //   return this.questionerRepository.save(post);
  // }

  // remove(id: number): boolean {
  //   if (this.questionerRepository.delete(id)) return true;

  //   return false;
  // }
}
