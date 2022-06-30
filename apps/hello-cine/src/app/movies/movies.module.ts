import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './services/movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Movie} from "./entities/movie.entity";
import {Actor} from "./entities/actor.entity";

@Module({
    imports: [TypeOrmModule.forFeature([
      Movie,
      Actor,
    ])],
    controllers: [MoviesController],
    providers: [MoviesService],
  })
export class MoviesModule {}
