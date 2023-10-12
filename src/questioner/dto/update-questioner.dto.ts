import { PartialType } from '@nestjs/swagger';
import { CreateQuestionerDto } from './create-questioner.dto';

export class UpdateQuestionerDto extends PartialType(CreateQuestionerDto) {}
