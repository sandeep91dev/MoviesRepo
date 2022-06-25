import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { SETTINGS } from 'src/utils/app.utils';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  createFilm(@Body(SETTINGS.VALIDATION_PIPE) createFilmDto: CreateFilmDto) {
    return this.filmsService.createFilm(createFilmDto);
  }

  @Get()
  getAllFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id')
  getFilm(@Param('id') id: string) {
    return this.filmsService.getFilm(id);
  }

  @Patch(':id')
  updateFilm(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.updateFilm(id, updateFilmDto);
  }


  @Delete(':id')
  deleteFilm(@Param('id') id: string) {
    return this.filmsService.deleteFilm(id);
  }
}
