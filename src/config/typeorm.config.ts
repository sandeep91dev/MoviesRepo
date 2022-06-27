import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import {join} from 'path';
import { Comment } from 'src/comments/entities/comment.entity';
import { Film } from 'src/films/entities/film.entity';
import { User } from 'src/users/entities/user.entity';
//import { DataSourceOptions, DataSource } from 'typeorm';


// export const databaseConfig: DataSourceOptions = {
//     type: 'mongodb',
//     url: `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@moviescluster.21kpkhm.mongodb.net/?retryWrites=true&w=majority`,
//     //   host:process.env.DB_HOST,
//     //   username: process.env.DB_USER,
//     //   database: process.env.DB_NAME,
//     //   password: process.env.DB_PASSWORD,
//       entities: [join(__dirname, '**', '*.entity.{ts,js}')],
//       migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },
//       synchronize: false,
//       logging: true,
//       migrationsRun: true
//   };
  
 

  export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'mongodb',
            url: `mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/?retryWrites=true&w=majority`,
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
          };
    },
  };

