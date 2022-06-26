import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { MvloggingModule } from 'src/utils/mvlogging/mvlogging.module';
import { MvloggingService } from 'src/utils/mvlogging/mvlogging.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository]),MvloggingModule],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, MvloggingService]
})
export class CommentsModule {}
