import { Module } from '@nestjs/common';
import { QuestionerService } from './questioner.service';
import { QuestionerController } from './questioner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questioner } from './entities/questioner.entity';
import { Question } from 'src/question/entities/question.entity';
import { Customers } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questioner, Question, Customers])],
  controllers: [QuestionerController],
  providers: [QuestionerService],
})
export class QuestionerModule {}
