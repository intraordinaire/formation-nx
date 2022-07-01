import {Test, TestingModule} from '@nestjs/testing';
import {HttpStatus, INestApplication} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as request from 'supertest';

import {MoviesModule} from "./movies.module";

describe('[Feature] Movies /movies', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MoviesModule,
        TypeOrmModule.forRoot(({
            type: 'postgres',
            host: process.env.POSTGRES_TEST_HOST,
            port: parseInt(process.env.POSTGRES_TEST_PORT, 10),
            username: process.env.POSTGRES_TEST_USER,
            password: process.env.POSTGRES_TEST_PASSWORD,
            database: process.env.POSTGRES_TEST_DB,
            autoLoadEntities: true,
            synchronize: true,
          })
        ),
      ]
    }).compile();

    app = module.createNestApplication()
    app.init()
  });

  it('/movies [GET]', () => {
    return request(app.getHttpServer()).get('/movies').expect(200)
  })

  it('/movies [POST]', () => {
    const movieDto = {
      "title": "Forrest Gump",
      "releaseDate": "2010-01-01T00:00:00z",
      "actorList": [{
        "firstname": "Tom",
        "lastname": "Hanks",
        "nickname": "TH",
        "age": 55
      }]
    }

    return request(app.getHttpServer()).post('/movies').send(movieDto)
      .expect(HttpStatus.CREATED)
      .then(({body}) => {
        const expectedMovie = expect.objectContaining({
          ...movieDto,
          actorList: expect.arrayContaining(movieDto.actorList.map(actor => expect.objectContaining({
            ...actor,
          })))
        })

        expect(body).toEqual(expectedMovie)
        expect(body.id).toBeDefined()
        expect(body.id).toEqual(expect.any(Number))
      })
  })

  it('/movies/:id [GET]', () => {
    const movieDto = {
      "title": "Forrest Gump",
      "releaseDate": "2010-01-01T00:00:00z",
      "actorList": [{
        "firstname": "Tom",
        "lastname": "Hanks",
        "nickname": "TH",
        "age": 55
      }]
    }

    request(app.getHttpServer()).post('/movies').send(movieDto)
      .expect(HttpStatus.CREATED)
      .then(({body}) => {
        const expectedMovie = expect.objectContaining({
          ...movieDto,
          actorList: expect.arrayContaining(movieDto.actorList.map(actor => expect.objectContaining({
            ...actor,
          })))
        })

        expect(body).toEqual(expectedMovie)
        expect(body.id).toBeDefined()
        expect(body.id).toEqual(expect.any(Number))
      })


    return request(app.getHttpServer()).get('/movies/').expect(200)
  })


  afterAll(async () => {
    app.close()
  })
});
