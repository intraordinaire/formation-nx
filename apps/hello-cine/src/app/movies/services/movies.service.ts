import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import {CreateMovieDto} from "../dtos/create-movie.dto";
import {UpdateMovieDto} from "../dtos/update-movie.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(limit: number, offset: number) {
    return await this.movieRepository.find({
      relations: ['actorList'],
    });
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id,
      },
      relations: ['actorList'],
    })

    if(movie === undefined || movie === null) {
        throw new NotFoundException(`Movie #${id} not found`)
    }

    return movie
  }

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto)
    return await this.movieRepository.save(movie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const existingMovie = await this.movieRepository.preload({
      id,
      ...updateMovieDto,
    })

    if (existingMovie === undefined || existingMovie === null) {
      throw new NotFoundException(`Movie #${id} not found`)
    }

    return await this.movieRepository.save(existingMovie);
  }

  async delete(id: number) {
    const movie = await this.findOne(id)
    return await this.movieRepository.remove(movie)
  }
}
