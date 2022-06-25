import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsRepository } from './films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmsRepository])],
  controllers: [FilmsController],
  providers: [FilmsService, CommentsService]
})
export class FilmsModule {}
