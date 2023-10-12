import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Questioner } from '../entities/questioner.entity';

export class CreateQuestionerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  instance: string;

  @ApiProperty()
  @IsNotEmpty()
  questioner: Array<Questioner>;
}
