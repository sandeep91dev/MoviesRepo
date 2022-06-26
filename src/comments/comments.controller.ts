import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SETTINGS } from 'src/utils/app.utils';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRoles } from 'src/utils/enums/users.enum';
import { ReviewerGuard } from 'src/guards/reviewer.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'),ReviewerGuard)
  @Post()
  createComment(@Body(SETTINGS.VALIDATION_PIPE) createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MEMBER)
  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MEMBER)
  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.commentsService.getComment(id);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MEMBER)
  @Patch(':id')
  updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MEMBER)
  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
