import { Module } from '@nestjs/common';
import { MvloggingService } from 'src/utils/mvlogging/mvlogging.service';
import { SeederService } from './seeder.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import {join} from 'path';
import { typeOrmAsyncConfig } from '../../config/typeorm.config';
import { MvloggingModule } from 'src/utils/mvlogging/mvlogging.module';
import { User } from 'src/users/entities/user.entity';
import { Film } from 'src/films/entities/film.entity';
import { Comment } from 'src/comments/entities/comment.entity';



@Module({
  imports :[    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env`, isGlobal:true }),
  MvloggingModule,
  TypeOrmModule.forRoot({
    type: 'mongodb',
    url: `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@moviescluster.21kpkhm.mongodb.net/?retryWrites=true&w=majority`,
    //   host:process.env.DB_HOST,
    //   username: process.env.DB_USER,
     database: process.env.DB_NAME,
    //   password: process.env.DB_PASSWORD,
      entities: [User, Film, Comment],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
      migrationsRun: true
  })],
  providers: [SeederService, MvloggingService]
})
export class SeederModule {}
