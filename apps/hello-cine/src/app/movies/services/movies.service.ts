import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Movie} from '../entities/movie.entity';
import {CreateMovieDto} from "../dtos/create-movie.dto";
import {UpdateMovieDto} from "../dtos/update-movie.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateActorDto} from "../dtos/create-actor.dto";
import {Actor} from "../entities/actor.entity";
import {PaginationQueryDto} from "../../common/dtos/pagination-query.dto";
import {ConfigService, ConfigType} from "@nestjs/config";

import moviesConfig from "../movies.config";


@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    // private readonly configService: ConfigService,
    @Inject(moviesConfig.KEY)
    private readonly moviesConfiguration: ConfigType<typeof moviesConfig>,
  ) {
    // const host = this.configService.get('database.host');
    // const moviesConfig = this.configService.get('movies');

    // console.log(this.moviesConfiguration);
  }

  async findAll({paginationQuery}: { paginationQuery: PaginationQueryDto }) {
    const {limit, offset} = paginationQuery;
    return await this.movieRepository.find({
      relations: ['actorList'],
      skip: offset !== null ? offset : null,
      take: limit !== null ? limit : null,
    });
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id,
      },
      relations: ['actorList'],
    })

    if (movie === undefined || movie === null) {
      throw new NotFoundException(`Movie #${id} not found`)
    }

    return movie
  }

  async create(createMovieDto: CreateMovieDto) {
    const actorList = await this.getActorList(createMovieDto)
    const movie = this.movieRepository.create({
      ...createMovieDto,
      ...actorList === undefined ? {} : {actorList},
    })
    return await this.movieRepository.save(movie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const actorList = await this.getActorList(updateMovieDto)

    const existingMovie = await this.movieRepository.preload({
      id,
      ...updateMovieDto,
      ...actorList === undefined ? {} : {actorList},
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

  private async getActorList(movieDto: CreateMovieDto | UpdateMovieDto) {
    return movieDto.actorList === undefined ? undefined : await Promise.all(movieDto.actorList.map(actorDto => this.preloadActorByNickname(actorDto)))
  }

  private async preloadActorByNickname(createActorDto: CreateActorDto) {
    const actor = createActorDto.nickname !== undefined && await this.actorRepository.findOne({
      where: {
        nickname: createActorDto.nickname,
      }
    })

    if (actor !== undefined && actor !== null) {
      return {
        ...actor,
        ...createActorDto,
      };
    }

    return this.actorRepository.create(createActorDto)
  }
}
