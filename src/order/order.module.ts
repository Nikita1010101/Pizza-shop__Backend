import { Module } from '@nestjs/common'

import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { PrismaService } from 'src/prisma.service'
import { PizzaService } from 'src/pizza/pizza.service'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { ConfigModule } from '@nestjs/config'

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, PizzaService],
})
export class OrderModule {}
