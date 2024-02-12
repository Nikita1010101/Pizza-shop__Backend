import { Injectable, NotFoundException } from '@nestjs/common'

import { PizzaService } from 'src/pizza/pizza.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pizzaService: PizzaService,
  ) {}

  private async findOne(profileId: number, pizzaId: number) {
    return await this.prisma.order.findFirst({
      where: { pizzaId, userId: profileId },
    })
  }

  private async getOrdersId(profileId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: profileId,
      },
    })
    return orders.map((order) => order.pizzaId)
  }

  async getAll(profileId: number) {
    const ordersId = await this.getOrdersId(profileId)
    return this.pizzaService.getAllSelected(ordersId, profileId)
  }

  async create(profileId: number, pizzaId: number) {
    const order = await this.findOne(profileId, pizzaId)

    if (!order) {
      return await this.prisma.order.create({
        data: {
          pizzaId,
          userId: profileId,
        },
      })
    }

    return await this.increment(profileId, order.id)
  }

  async delete(profileId: number, pizzaId: number) {
    const order = await this.findOne(profileId, pizzaId)
    if (!order) throw new NotFoundException('Order not found!')
    return await this.prisma.order.delete({ where: { id: order.id } })
  }

  async increment(profileId: number, orderId: number) {
    return await this.prisma.order.update({
      where: { id: orderId, userId: profileId },
      data: { count: { increment: 1 } },
    })
  }

  async decrement(profileId: number, orderId: number) {
    return await this.prisma.order.update({
      where: { id: orderId, userId: profileId },
      data: { count: { decrement: 1 } },
    })
  }

  async getCount(profileId: number) {
    const { length } = await this.getOrdersId(profileId)
    return { count: length }
  }

  async getTotalPrice(profileId: number) {
    const ordersId = await this.getOrdersId(profileId)
    const price = await this.pizzaService.getTotalPrice(ordersId, profileId)
    return { price }
  }
}
