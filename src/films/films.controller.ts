import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { SETTINGS } from 'src/utils/app.utils';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRoles } from 'src/utils/enums/users.enum';
import { AuthGuard } from '@nestjs/passport';


@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post()
  createFilm(@Body(SETTINGS.VALIDATION_PIPE) createFilmDto: CreateFilmDto) {
    return this.filmsService.createFilm(createFilmDto);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MEMBER)
  @Get()
  getAllFilms() {
    return this.filmsService.getAllFilms();
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MEMBER)
  @Get(':id')
  getFilm(@Param('id') id: string) {
    return this.filmsService.getFilm(id);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Patch(':id')
  updateFilm(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.updateFilm(id, updateFilmDto);
  }

  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  deleteFilm(@Param('id') id: string) {
    return this.filmsService.deleteFilm(id);
  }
}
