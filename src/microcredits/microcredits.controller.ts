import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicrocreditsService } from './microcredits.service';
import { CreateMicrocreditDto } from './dto/create-microcredit.dto';
import { UpdateMicrocreditDto } from './dto/update-microcredit.dto';

@Controller('microcredits')
export class MicrocreditsController {
  constructor(private readonly microcreditsService: MicrocreditsService) {}

  @Post()
  create(@Body() createMicrocreditDto: CreateMicrocreditDto) {
    return this.microcreditsService.create(createMicrocreditDto);
  }

  @Get()
  findAll() {
    return this.microcreditsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microcreditsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMicrocreditDto: UpdateMicrocreditDto) {
    return this.microcreditsService.update(+id, updateMicrocreditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microcreditsService.remove(+id);
  }
}
