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
  Query,
} from '@nestjs/common';
import { QuestionerService } from './questioner.service';
import { CreateQuestionerDto } from './dto/create-questioner.dto';
import { UpdateQuestionerDto } from './dto/update-questioner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Questioner')
@Controller('questioner')
export class QuestionerController {
  constructor(private readonly questionerService: QuestionerService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createQuestionDto: CreateQuestionerDto,
  ) {
    try {
      const cust = {
        name: createQuestionDto.name,
        instance: createQuestionDto.instance,
        position: createQuestionDto.position,
        comments: createQuestionDto.comments || '',
      };

      const customer = await this.questionerService.createCustomer(cust);
      const questioner = createQuestionDto.questioner;
      for (let q in createQuestionDto.questioner) {
        questioner[q].customer = customer;
      }
      this.questionerService.create(questioner);
      return new HttpException('Questioner is Filled', HttpStatus.OK);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fill questioner',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/respondents?')
  respondents(@Query('start') start: string, @Query('end') end: string) {
    console.log(new Date(start));
    return this.questionerService.respondents(
      new Date(new Date(start)),
      new Date(new Date(end)),
    );
  }

  @Get()
  findAll() {
    return this.questionerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionerService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateQuestionerDto: UpdateQuestionerDto,
  // ) {
  //   return this.questionerService.update(+id, updateQuestionerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.questionerService.remove(+id);
  // }
}
