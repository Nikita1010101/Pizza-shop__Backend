import { IsString } from "class-validator";

export class GetOnePizzaDto {
  @IsString()
  id: string
}