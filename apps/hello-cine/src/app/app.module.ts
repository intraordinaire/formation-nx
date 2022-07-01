import * as Joi from '@hapi/joi'
import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MoviesModule} from './movies/movies.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

import appConfig from "./app.config";
import {APP_GUARD} from "@nestjs/core";
import {ApiKeyGuard} from "./common/guards/api-key.guard";
import {LoggingMiddleware} from "./common/middlewares/logging.middleware";

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: true,
      })
    })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes('*')
    // consumer.apply(LoggingMiddleware).exclude('*')
    consumer.apply(LoggingMiddleware).forRoutes({
      path: 'movies',
      method: RequestMethod.GET,
    })
  }

}
