import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import {CreateMovieDto} from "./dtos/create-movie.dto";
import {UpdateMovieDto} from "./dtos/update-movie.dto";

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  findAll(@Query() paginatioQuery) {
    const { limit, offset } = paginatioQuery;
    return this.movieService.findAll(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(id)
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.delete(id)
  }
}
