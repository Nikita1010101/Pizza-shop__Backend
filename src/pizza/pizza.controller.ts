import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'

import { PizzaService } from './pizza.service'
import { GetOnePizzaDto } from './dto/get-one-pizza.dto'
import { CreatePizzaDto } from './dto/create-pizza.dto'


@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  async getAll() {
    return await this.pizzaService.getAll()
  }

  @Get('/:id')
  async getOne(@Param() dto: GetOnePizzaDto) {
    return await this.pizzaService.getOne(+dto.id)
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() dto: CreatePizzaDto[]) {
    return await this.pizzaService.create(dto)
  }
}
