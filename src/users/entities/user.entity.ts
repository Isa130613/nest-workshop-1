import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FinancialRecord } from './financialRecord.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  creditScore: number;

  @OneToMany(() => FinancialRecord, (record) => record.user)
  financialHistory: FinancialRecord[];
}
