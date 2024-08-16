import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Microcredit } from './entities/microcredit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

@Injectable()
export class MicrocreditRegistryService {
  constructor(
    @InjectRepository(Microcredit)
    private readonly microcreditRepository: Repository<Microcredit>,
  ) {}
  async createMicrocredit(
    microcredit: Partial<Microcredit>,
  ): Promise<Microcredit> {
    const created = this.microcreditRepository.create({
      ...microcredit,
    });

    await this.microcreditRepository.save(created);
    return created;
  }
}

@Injectable()
export class MicrocreditService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly creditCalculationService: CreditCalculationService,
    private readonly microcreditRegistryService: MicrocreditRegistryService,
  ) {}

  async applyForMicrocredit(
    userId: string,
    amount: number,
  ): Promise<Microcredit> {
    const user = await this.userRepository.findOneBy({ id: +userId });
    const interestRate =
      this.creditCalculationService.calculateInterestRate(user);

    const microcredit = await this.microcreditRegistryService.createMicrocredit(
      {
        user,
        amount,
        interestRate,
        status: 'PENDING',
      },
    );
    return microcredit;
  }
}

interface InterestRateStrategy {
  calculate(user: User): number;
}

@Injectable()
export class StandardInterestRateStrategy implements InterestRateStrategy {
  calculate(user: User): number {
    return user.creditScore > 700 ? 5 : 15;
  }
}

@Injectable()
export class PremiumInterestRateStrategy implements InterestRateStrategy {
  calculate(user: User): number {
    return user.creditScore > 700 ? 3 : 10;
  }
}

@Injectable()
export class CreditCalculationService {
  private strategy: InterestRateStrategy;

  constructor(strategy: InterestRateStrategy) {
    this.strategy = strategy;
  }

  calculateInterestRate(user: User): number {
    return this.strategy.calculate(user);
  }
}
