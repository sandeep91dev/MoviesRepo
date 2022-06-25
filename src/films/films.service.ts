import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { v4 as uuidv4 } from 'uuid';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class FilmsService {
  constructor(private readonly commentsService: CommentsService) {}

  async createFilm(createFilmDto: CreateFilmDto) {
    const film = new Film();
    film.filmId = uuidv4();
    film.name = createFilmDto.name;
    film.releaseDate = createFilmDto.releaseDate;
    film.country = createFilmDto.country;
    film.genre = createFilmDto.genre;
    return film.save();
  }

  getAllFilms() {
    return Film.find();
  }

  async getFilm(filmId: string, getComments=true): Promise<Film | undefined> {
    let reviews;
    if(getComments){
      reviews = await this.commentsService.getCommentsByFilm(filmId);
    }
    const film = Film.findOneBy({  filmId} );
    film["reviews"] = reviews;
    return film;
  }

  async updateFilm(id: string, updateFilmDto: UpdateFilmDto) {

    let updateObj = {};
    console.log("Update DTo",updateFilmDto)
    if(updateFilmDto.name) updateObj['name'] = updateFilmDto.name;
    if(updateFilmDto.description) updateObj['description'] = updateFilmDto.description;
    if(updateFilmDto.photo) updateObj['photo'] = updateFilmDto.photo;
    if(updateFilmDto.country) updateObj['country'] = updateFilmDto.country;
    if(updateFilmDto.genre) updateObj['genre'] = updateFilmDto.genre;
    if(updateFilmDto.releaseDate) updateObj['releaseDate'] = updateFilmDto.releaseDate;

    if(updateFilmDto.rating){
      const film = await this.getFilm(id, false);
      const rating = film.rating;

      //Incrementing corresponding key in rating map
      //TODO: Change this to mongodb native $inc 
      rating[updateFilmDto.rating.toString()]++;
      updateObj['rating']  = rating;

      //Calculating average rating for particular film
      let ratingCount = 0;
      let ratingSum = 0;
      let avgRating = 0;

      for(let key in rating){
         ratingCount += rating[key];
         ratingSum += parseInt(key) * rating[key]
      }
      if(ratingSum>0){
        avgRating = Math.ceil(ratingSum/ratingCount);
      }
      updateObj['avgRating'] = avgRating;
    } 
    console.log("Update Obj", updateObj);

    const film = await Film.update({"filmId":id},{
      ...updateObj,
      updatedAt: Date.now()
    });

    return film;
  }

  deleteFilm(filmId: string) {
    return Film.update(
      filmId,
     {
      deleted: true
    });
  }

}

