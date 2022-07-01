import {IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateActorDto {
  @ApiProperty({
    description: 'The firstname of the actor',
    example: 'Bruce',
  })
  @IsString()
  readonly firstname: string

  @ApiProperty({
    description: 'The lastname of the actor',
  })
  @IsString()
  readonly lastname: string

  @ApiProperty({
    description: 'The nickname of the actor',
  })
  @IsString()
  readonly nickname: string

  @ApiProperty({
    description: 'The age of the actor',
  })
  @IsNumber()
  @Type(() => Number)
  readonly age: number
}
