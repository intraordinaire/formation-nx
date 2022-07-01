/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment'
import {HttpExceptionFilter} from "./app/common/filters/http-exception.filter";
import {WrapResponseInterceptor} from "./app/common/interceptors/wrap-response.interceptor";
import {TimeoutInterceptor} from "./app/common/interceptors/timeout.interceptor";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = environment.production ? 'api' : '';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // Setup wrapper
  const options = new DocumentBuilder()
    .setTitle('Hello ciné')
    .setDescription('Hello ciné application')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)


  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
