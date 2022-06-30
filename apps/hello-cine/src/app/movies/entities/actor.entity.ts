import {Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Movie} from "./movie.entity";

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  @Index()
  nickname: string

  @Column()
  age: number

  @ManyToMany(
    () => Movie,
    movie => movie.actorList
  )
  movieList: Movie[]

}
