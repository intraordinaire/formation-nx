import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
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
  nickname: string

  @Column()
  age: number

  @ManyToMany(
    () => Movie,
    movie => movie.actorList,
    {
      cascade: true,
    }
  )
  movieList: string[]

}
