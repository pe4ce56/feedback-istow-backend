import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Questioner } from '../entities/questioner.entity';
import { Instance } from 'src/instance/entities/instance.entity';

export class CreateQuestionerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsNotEmpty()
  instance: Instance;

  @ApiProperty()
  @IsNotEmpty()
  questioner: Array<Questioner>;
}
