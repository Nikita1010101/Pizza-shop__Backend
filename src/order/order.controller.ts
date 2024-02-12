import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { User } from '@prisma/client'

import { OrderService } from './order.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { OrderDto } from './dto/order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth()
  @Get()
  async getAll(@CurrentUser() user: User) {
    return await this.orderService.getAll(user.id)
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Post('create')
  async create(@CurrentUser() user: User, @Body() dto: OrderDto) {
    return await this.orderService.create(user.id, dto.pizzaId)
  }

  @Auth()
  @Delete('delete/:pizzaId')
  async delete(@CurrentUser() user: User, @Param('pizzaId') pizzaId: string) {
    return await this.orderService.delete(user.id, +pizzaId)
  }

  @Auth()
  @Patch('increment')
  async increment(@CurrentUser() user: User, @Body() dto: UpdateOrderDto) {
    return await this.orderService.increment(user.id, dto.orderId)
  }

  @Auth()
  @Patch('decrement')
  async decrement(@CurrentUser() user: User, @Body() dto: UpdateOrderDto) {
    return await this.orderService.decrement(user.id, dto.orderId)
  }

  @Auth()
  @Get('count')
  async getCount(@CurrentUser() user: User) {
    return this.orderService.getCount(user.id)
  }

  @Auth()
  @Get('total-price')
  async getTotalPrice(@CurrentUser() user: User) {
    return this.orderService.getTotalPrice(user.id)
  }
}
