import { Customers } from 'src/questioner/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'intance', synchronize: true })
export class Instance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
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

  @OneToMany(() => Customers, (instance: Customers) => instance.instance, {
    cascade: true,
  })
  customers: Customers;
}
