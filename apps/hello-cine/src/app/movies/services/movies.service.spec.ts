import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import moviesConfig from "../movies.config";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Movie} from "../entities/movie.entity";
import {Actor} from "../entities/actor.entity";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

export type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>

export const createMockRepository = <T> (): MockRepository<T> => ({
  findOne: jest.fn(),
})

describe('MoviesService', () => {
  let service: MoviesService;
  let mockMovieRepository: MockRepository<Movie>;
  let mockActorRepository: MockRepository<Actor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: moviesConfig.KEY,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: createMockRepository<Movie>(),
        },
        {
          provide: getRepositoryToken(Actor),
          useValue: createMockRepository<Actor>(),
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    mockMovieRepository = module.get(getRepositoryToken(Movie))
    mockActorRepository = module.get(getRepositoryToken(Actor))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('When movie ID exist', () => {
      it('should return a movie', async () => {
        const movieId = 1;
        const expectedMovie = {
          id: movieId,
        };
        mockMovieRepository.findOne.mockReturnValue(expectedMovie)

        const movie = await service.findOne(movieId)
        expect(movie).toEqual(expectedMovie)
      })
    })
    describe('When movie ID did not exist', () => {
      it('should throw an NotFoundException', async () => {
        const movieId = 1;
        mockMovieRepository.findOne.mockReturnValue(null)
        await expect(service.findOne(movieId)).rejects.toThrowError(NotFoundException)
        // OR
        try {
          await service.findOne(movieId)
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException)
          expect(error.message).toEqual(`Movie #${movieId} not found`)
        }
      })
    })
  })
});
