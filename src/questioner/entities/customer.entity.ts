import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Questioner } from './questioner.entity';
import { Instance } from 'src/instance/entities/instance.entity';

@Entity({ name: 'customers', synchronize: true })
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  comments: string;

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
    (questioner: Questioner) => questioner.customer,
    {
      cascade: true,
    },
  )
  questioners: Questioner[];

  @ManyToOne(() => Instance, (instance: Instance) => instance.customers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  instance: Instance;
}
