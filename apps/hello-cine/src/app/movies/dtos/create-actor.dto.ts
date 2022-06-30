import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateActorDto {
  @IsString()
  readonly firstname: string
  @IsString()
  readonly lastname: string
  @IsString()
  readonly nickname: string
  @IsNumber()
  @Type(() => Number)
  readonly age: number
}
