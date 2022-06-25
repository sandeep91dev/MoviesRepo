import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    ObjectIdColumn,
    PrimaryColumn
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
  
  @Entity({ name: 'film' })
  export class Film extends BaseEntity {

    @ApiProperty({ description: 'Primary key as filmId', example: 'abcd123' })
    @ObjectIdColumn()
    _id: ObjectId;

    @PrimaryColumn()
    filmId: string;
  
    @ApiProperty({ description: 'Film name', example: 'Titanic' })
    @Column()
    name: string;
  
    @ApiProperty({
      description: 'Film release date',
      example: '2022-06-23T14:18:26.279+00:00',
    })
    @Column()
    releaseDate: Date;

    @ApiProperty({
        description: 'Users favorite movies, genres etc',
        example: 'I just review sci-fi movies',
    })
    @Column()
    description:string;

    @ApiProperty({
        description: 'Movies thumbail url',
        example: 'titanic.png',
    })
    @Column()
    photo:string

    @ApiProperty({
        description: 'Country from which the movie originated from',
        example: 'United States',
    })
    @Column()
    country:string
 
    @ApiProperty({
        description: 'deleted:true if film has been deleted',
        example: 'false',
    })
    @Column('boolean', {default: false})
    deleted:boolean = false;

    @ApiProperty({
        description: 'Genre to whcih film belongs to, 1 film can belong to multiple grenres',
        example: '[Action, Thriller]',
    })
    @Column()
    genre:Array<string>

    @Column()
    avgRating:number

    @ApiProperty({description:'Ratings of the movie'})
    @Column()
    rating: object =  {"1":0,"2":0,"3":0,"4":0,"5":0};
  
    @ApiProperty({ description: 'When user was created' })
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty({ description: 'When user was updated' })
    @UpdateDateColumn()
    updatedAt: Date;
  
  }
  

