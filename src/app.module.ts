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

const username = encodeURIComponent("db_rw_user");
const password = encodeURIComponent("xBi6xC9al0aqt6Hv");


@Module({
  imports: [UsersModule, FilmsModule, CommentsModule, 
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
    type: 'mongodb',
    url: `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@moviescluster.21kpkhm.mongodb.net/?retryWrites=true&w=majority`,
    // port: 27017,
    //  ssl:true,
    // sslCert:'',
    // sslKey:'',
    database: 'movies',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
    logging:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
