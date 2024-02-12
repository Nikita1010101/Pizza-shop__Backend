import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PizzaModule } from './pizza/pizza.module'
import { OrderModule } from './order/order.module'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [ConfigModule.forRoot(), PizzaModule, OrderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
