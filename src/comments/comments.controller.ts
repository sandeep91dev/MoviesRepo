import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SETTINGS } from 'src/utils/app.utils';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Body(SETTINGS.VALIDATION_PIPE) createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.commentsService.getComment(id);
  }

  @Patch(':id')
  updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
