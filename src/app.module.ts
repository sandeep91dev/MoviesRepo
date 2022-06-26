import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilmsModule } from './films/films.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import {join} from 'path';
import { typeOrmAsyncConfig } from './config/typeorm.config';


@Module({
  imports: [UsersModule, FilmsModule, CommentsModule, 
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env`, isGlobal:true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig)],
    controllers: [AppController],
    providers: [AppService],
  })
export class AppModule {}
