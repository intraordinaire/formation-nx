import {Module, ValidationPipe} from '@nestjs/common';
import {MoviesController} from './movies.controller';
import {MoviesService} from './services/movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Movie} from "./entities/movie.entity";
import {Actor} from "./entities/actor.entity";
import {ConfigModule} from "@nestjs/config";

import moviesConfig from "./movies.config";
import {APP_PIPE} from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forFeature(moviesConfig),
    TypeOrmModule.forFeature([
      Movie,
      Actor,
    ]),
  ],
  controllers: [MoviesController],
  providers: [
    {
      provide: MoviesService,
      useClass: MoviesService,
    },
    // {
    //   provide: APP_PIPE,
    //   useFactory: () => new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transform: true
    //   })
    // },
  ],
})
export class MoviesModule {
}
