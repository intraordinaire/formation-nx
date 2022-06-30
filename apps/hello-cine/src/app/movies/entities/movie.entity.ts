import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import {Actor} from "./actor.entity";

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  releaseDate: string

  @ManyToMany(
    () => Actor,
    actor => actor.movieList,
  )
  @JoinTable()
  actorList: string[]

}
