import { Questioner } from 'src/questioner/entities/questioner.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'question', synchronize: true })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(
    () => Questioner,
    (questioner: Questioner) => questioner.question,
    {
      cascade: true,
    },
  )
  questioners: Questioner;
}
