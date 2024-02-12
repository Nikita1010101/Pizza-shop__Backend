import { Module } from '@nestjs/common';

import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PizzaController],
  providers: [PizzaService, PrismaService],
})
export class PizzaModule {}
