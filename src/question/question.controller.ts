import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createQuestionDto: CreateQuestionDto,
  ) {
    try {
      const data = await this.questionService.create({
        question: createQuestionDto.question,
        type: createQuestionDto.type,
      });
      return data;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
