import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    ObjectIdColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { ApiProperty } from '@nestjs/swagger';
  import { UserRoles } from '../../utils/enums/users.enum';
  import { ObjectId } from 'mongodb';
  
  @Entity({ name: 'users' })
  export class User extends BaseEntity {
    @ApiProperty({ description: 'Primary key as User ID', example: 'abcd123' })
    @ObjectIdColumn()
    _id: ObjectId;

    @PrimaryColumn()
    userId:string
  
    @ApiProperty({ description: 'User name', example: 'Jhon Doe' })
    @Column()
    name: string;
  
    @ApiProperty({
      description: 'User email address',
      example: 'jhon.doe@gmail.com',
    })
    @Column({
      unique: true,
    })
    email: string;

    @ApiProperty({
        description: 'Users favorite movies, genres etc',
        example: 'I just review sci-fi movies',
    })
    @Column()
    description:string;

    @ApiProperty({
        description: 'Identifes if a user allowed to review',
        example: 'true',
    })
    @Column('boolean', {default: false})
    isReviewer:boolean = false;

    @Column('boolean', {default: false})
    deleted:boolean = false;
  
    @ApiProperty({ description: 'Hashed user password' })
    @Column()
    password: string;

    @ApiProperty({description:'Role of the user , it can be either of member or reviewer or admin'})
    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER })
    role: UserRoles = UserRoles.MEMBER;
  
    @ApiProperty({ description: 'When user was created' })
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty({ description: 'When user was updated' })
    @UpdateDateColumn()
    updatedAt: Date;
  
    @BeforeInsert()
    async setPassword(password: string) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(password || this.password, salt);
    }
  }
  
