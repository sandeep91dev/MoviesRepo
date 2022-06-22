import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilmsModule } from './films/films.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, FilmsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
