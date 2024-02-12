import { IsNumber, IsString } from "class-validator"

export class CreatePizzaDto {
  @IsString()
  title: string

  @IsString()
  ingredients: string

  @IsString()
  imagePath: string

  @IsNumber()
  price: number
}