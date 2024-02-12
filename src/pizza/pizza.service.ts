import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { CreatePizzaDto } from './dto/create-pizza.dto'

@Injectable()
export class PizzaService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.pizza.findMany()
  }

  async getOne(id: number) {
    return this.prisma.pizza.findUnique({ where: { id: id } })
  }

  async create(dto: CreatePizzaDto[]) {
    return this.prisma.pizza.createMany({ data: dto })
  }

  async getAllSelected(id: number[], profileId: number) {
    return this.prisma.pizza.findMany({
      where: { id: { in: id } },
      select: {
        id: true,
        imagePath: true,
        ingredients: true,
        price: true,
        title: true,
        orders: {
          where: {
            userId: profileId,
          },
          select: {
            id: true,
            count: true,
          },
        },
      },
    })
  }

  async getTotalPrice(id: number[], profileId: number) {
    const pizzas = await this.getAllSelected(id, profileId)
    return pizzas.reduce(
      (sum, pizza) => sum + pizza.price * pizza.orders[0].count,
      0,
    )
  }
}
