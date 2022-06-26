import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsRepository } from './films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';
import { UsersService } from 'src/users/users.service';
import { MvloggingModule } from 'src/utils/mvlogging/mvlogging.module';
import { MvloggingService } from 'src/utils/mvlogging/mvlogging.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmsRepository]), MvloggingModule],
  controllers: [FilmsController],
  providers: [FilmsService, CommentsService, UsersService, MvloggingService]
})
export class FilmsModule {}
