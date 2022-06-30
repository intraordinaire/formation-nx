import {IsString} from "class-validator";
import {Actor} from "../entities/actor.entity";

export class CreateMovieDto {
  @IsString()
  readonly title: string
  @IsString()
  readonly releaseDate: string
  @IsString({each: true})
  readonly actorList: Actor[]
}
