import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, Index} from "typeorm";
import {Actor} from "./actor.entity";

@Entity('movies')
@Index(['title', 'releaseDate'])
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
    {
      cascade: true,
    }
  )
  @JoinTable()
  actorList: Actor[]

}
