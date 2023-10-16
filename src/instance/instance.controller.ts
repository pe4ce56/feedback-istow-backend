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
import { InstanceService } from './instance.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Instance')
@Controller('instance')
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) createInstanceDto: CreateInstanceDto,
  ) {
    try {
      const data = await this.instanceService.create({
        name: createInstanceDto.name,
      });
      return data;
    } catch (e) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.instanceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instanceService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstanceDto: UpdateInstanceDto,
  ) {
    return this.instanceService.update(+id, updateInstanceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instanceService.remove(+id);
  }
}
