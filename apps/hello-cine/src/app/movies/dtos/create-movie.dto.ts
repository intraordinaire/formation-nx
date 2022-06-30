import {IsArray, IsString, ValidateNested} from "class-validator";
import {CreateActorDto} from "./create-actor.dto";
import {Type} from "class-transformer";

export class CreateMovieDto {
  @IsString()
  readonly title: string
  @IsString()
  readonly releaseDate: string
  @Type(() => CreateActorDto)
  @IsArray()
  @ValidateNested()
  readonly actorList: CreateActorDto[]
}
