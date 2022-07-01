import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import {MoviesService} from './services/movies.service';
import {CreateMovieDto} from "./dtos/create-movie.dto";
import {UpdateMovieDto} from "./dtos/update-movie.dto";
import {PaginationQueryDto} from "../common/dtos/pagination-query.dto";
import {Public} from "../common/decorators/public.decorator";
import {delay, of} from "rxjs";
import {ParseIntPipe} from "../common/pipes/parse-int.pipe";
import {Protocol} from "../common/decorators/protocol.decorator";
import {ApiForbiddenResponse, ApiResponse, ApiTags} from "@nestjs/swagger";

@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
}))
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {
  }

  @Get()
  @Public()
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
    console.log(protocol)
    return this.movieService.findAll({paginationQuery})
    // return of(this.movieService.findAll({paginationQuery})).pipe(
    //   // delay(6000),
    // );
  }

  @Get(':id')
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id)
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.delete(id)
  }
}
