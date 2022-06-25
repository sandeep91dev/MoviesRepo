import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Ratings } from '../../utils/enums/ratings.enum';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
    @IsNotEmpty()
    @IsOptional()
    @IsEnum(Ratings)
    rating: number;
}
