import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Ratings } from '../../utils/enums/ratings.enum';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
    @IsNotEmpty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
}
