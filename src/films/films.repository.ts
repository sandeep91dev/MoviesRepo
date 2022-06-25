import { EntityRepository, Repository } from 'typeorm';
import { Film } from './entities/film.entity';

@EntityRepository(Film)
export class FilmsRepository extends Repository<Film> {}