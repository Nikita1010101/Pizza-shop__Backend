import { IsOptional, IsString } from "class-validator";

export class EditUserDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  surname: string
}