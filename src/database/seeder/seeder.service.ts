import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Comment } from 'src/comments/entities/comment.entity';
import { Film } from 'src/films/entities/film.entity';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/users.repository';
import { UserRoles } from 'src/utils/enums/users.enum';
import { MvloggingService } from 'src/utils/mvlogging/mvlogging.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
//Todo implement intial bulk seed chaining so that next seed takes input from previous
//Import data instead of harcoding/use faker
export class SeederService {
  constructor(
    private readonly logger: MvloggingService,
  ) {}
  async seed(seedIn) {
    console.log("inside service", seedIn);
    switch(seedIn){
        case "user":
            await this.seedUsers()
            .then(completed => {
                this.logger.debug(JSON.stringify(completed))
                this.logger.debug('Successfuly completed seeding users...');
                Promise.resolve(true);
            })
            .catch(error => {
                this.logger.error('Failed seeding users...');
                Promise.reject(error);
            });
            break;
        case "film":
            await this.seedFilms()
            .then(completed => {
                this.logger.debug(JSON.stringify(completed))
                this.logger.debug('Successfuly completed seeding users...');
                Promise.resolve(true);
            })
            .catch(error => {
                this.logger.error('Failed seeding users...');
                Promise.reject(error);
            });
            break;
        case "comment":
            await this.seedComments()
            .then(completed => {
                this.logger.debug(JSON.stringify(completed))
                this.logger.debug('Successfuly completed seeding users...');
                Promise.resolve(true);
            })
            .catch(error => {
                this.logger.error('Failed seeding users...');
                Promise.reject(error);
            });
            break;
    }
    
  }

  userData = [{
    "name" : "Sandeep Shetty",
    "email":"sndpshtt881@gmail.com",
    "password":"@Test123",
    "role":UserRoles.ADMIN,
    "isReviewer":true
  },
  {
    "name" : "Sandeep Shetty2",
    "email":"sndpshtt881+2@gmail.com",
    "password":"@Test123",
    "role":UserRoles.MEMBER,
    "isReviewer":false
  }]

  commentData = [{
    "comment" : "Awesome film",
    "userId":"eb9fe384-089b-47a0-a46b-fa6819abd090",
    "filmId":"ae1e0177-e943-4642-9f27-8b171a0a842a",
  },
  {
    "comment" : "Great movie",
    "userId":"eb9fe384-089b-47a0-a46b-fa6819abd090",
    "filmId":"5160951c-c1d9-4cd8-b28f-0582aca5e212",
  },
  {
    "comment" : "Great movie",
    "userId":"eb9fe384-089b-47a0-a46b-fa6819abd090",
    "filmId":"0386de7f-5a3d-4fb3-9190-8c9e5540842d",
  }]

  filmData = [{
    "name" : "OngBack",
    "releaseDate":new Date(),
    "country":"China",
    "genre":["Action"],
  },
  {
    "name" : "Titanic",
    "releaseDate":new Date(),
    "country":"USA",
    "genre":["Drama"],
  },
  {
    "name" : "Charlie",
    "releaseDate":new Date(),
    "country":"India",
    "genre":["Comedy","Drama"],
  }]

  async seedUsers() {
    const promises = [];
    for(const userobj of this.userData){
    const user = new User();
    user.userId = uuidv4();
    user.name = userobj.name;
    user.email = userobj.email;
    user.password = userobj.password;
    user.role = userobj.role
    user.isReviewer = userobj.isReviewer;
    promises.push(await user.save())

    }
    return await Promise.allSettled(promises)
      .then(createdUsers => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of users created : ' + createdUsers.length,
        );
        return Promise.resolve(createdUsers);
      })
      .catch(error => Promise.reject(error));
  }

  async seedComments() {
    const promises = [];
    for(const commentobj of this.commentData){
    const comment = new Comment();

    comment.commentId = uuidv4();
    comment.comment = commentobj.comment;
    comment.userId = commentobj.userId;
    comment.filmId = commentobj.filmId;
    promises.push(await comment.save())

    }
    return await Promise.allSettled(promises)
      .then(createdComments => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of comments created : ' + createdComments.length,
        );
        return Promise.resolve(createdComments);
      })
      .catch(error => Promise.reject(error));
  }

  async seedFilms() {
    const promises = [];
    for(const filmobj of this.filmData){
    const film = new Film();
    film.filmId = uuidv4();
    film.name = filmobj.name;
    film.releaseDate = filmobj.releaseDate;
    film.country = filmobj.country;
    film.genre = filmobj.genre;
    promises.push(await film.save())

    }
    return await Promise.allSettled(promises)
      .then(createdFilms => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of films created : ' + createdFilms.length,
        );
        return Promise.resolve(createdFilms);
      })
      .catch(error => Promise.reject(error));
  }

  
}
