import { Injectable } from '@nestjs/common';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { Instance } from './entities/instance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(Instance)
    private instanceRepository: Repository<Instance>,
  ) {}
  create(question: Partial<Instance>): Promise<Instance> {
    const quest = this.instanceRepository.create(question);
    if (!quest) throw new Error('Create failed');
    return this.instanceRepository.save(quest);
  }
  findAll(): Promise<Instance[]> {
    return this.instanceRepository.find();
  }

  findOne(id: number): Promise<Instance> {
    return this.instanceRepository.findOne({ where: { id } });
  }

  async update(id: number, instance: Partial<Instance>): Promise<Instance> {
    const post = await this.instanceRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error('Post not found');
    }
    Object.assign(post, instance);
    return this.instanceRepository.save(post);
  }

  remove(id: number): boolean {
    if (this.instanceRepository.delete(id)) return true;
    return false;
  }
}
