import { Module } from '@nestjs/common';
import { MicrocreditsService } from './microcredits.service';
import { MicrocreditsController } from './microcredits.controller';

@Module({
  controllers: [MicrocreditsController],
  providers: [MicrocreditsService],
})
export class MicrocreditsModule {}
