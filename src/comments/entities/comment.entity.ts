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
  import { ObjectId } from 'mongodb';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
    @ApiProperty({ description: 'Unique Id', example: 'abcd123' })
    @ObjectIdColumn()
    _id: ObjectId;

    @PrimaryColumn()
    commentId:string

    @ObjectIdColumn()
    filmId: string;
  
    @ApiProperty({ description: 'Review for the film', example: 'Awesome!!' })
    @Column()
    comment: string;

    @Column()
    userId:string

    @ApiProperty({
      description: 'deleted:true if film has been deleted',
      example: 'false',
    })
    @Column('boolean', {default: false})
    deleted:boolean = false;
  

    @ApiProperty({ description: 'When user was created' })
    @CreateDateColumn()
    createdAt: Date;
    
    @ApiProperty({ description: 'When user was updated' })
    @UpdateDateColumn()
    updatedAt: Date;

}
