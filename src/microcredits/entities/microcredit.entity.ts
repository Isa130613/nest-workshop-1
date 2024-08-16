import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('micro-credits')
export class Microcredit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  amount: number;

  @Column()
  interestRate: number;

  @Column()
  status: string;
}
