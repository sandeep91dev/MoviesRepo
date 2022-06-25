import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { v4 as uuidv4 } from 'uuid';  

@Injectable()
export class CommentsService {
  createComment(createCommentDto: CreateCommentDto) {
    const comment= new Comment();

    comment.commentId = uuidv4();
    comment.comment = createCommentDto.comment;
    comment.userId = createCommentDto.userId;
    comment.filmId = createCommentDto.filmId;
    return comment.save();
  }

  getCommentsByFilm(filmId:string) {
    return Comment.findOne({ where: { filmId } });
  }

  getAllComments() {
    return Comment.find();
  }

  getComment(id: string) {
    return Comment.findOneByOrFail({ "commentId":id });
  }

  async updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    const updateObj = {};
    if(updateCommentDto.comment) updateObj['comment'] = updateCommentDto.comment;

    const comment = await Comment.update(id
    , {
      ...updateObj,
      updatedAt: new Date().toISOString(),
    });

    return comment;
  }

  deleteComment(id: string) {
    return Comment.update(
      id,
     {
      deleted: true
    });
  }
}
