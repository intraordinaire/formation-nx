import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import {MoviesService} from './services/movies.service';
import {CreateMovieDto} from "./dtos/create-movie.dto";
import {UpdateMovieDto} from "./dtos/update-movie.dto";
import {PaginationQueryDto} from "../common/dtos/pagination-query.dto";

@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
}))
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.movieService.findAll({paginationQuery});
  }

  @Get(':id')
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
