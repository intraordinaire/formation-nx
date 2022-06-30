import {IsNumber, IsOptional, IsPositive} from "class-validator";
import {Type} from "class-transformer";

export class PaginationQueryDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  readonly limit: number
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  readonly offset: number
}
