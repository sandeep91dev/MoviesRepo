import { IsArray, IsNotEmpty, Length } from 'class-validator';

export class CreateFilmDto {  
    @IsNotEmpty()
    @Length(3, 50)
    name: string;
  
    @IsNotEmpty()
    releaseDate: Date;

    @IsNotEmpty()
    @Length(3, 255)
    description:string;

    @IsNotEmpty()
    @Length(3, 255)
    photo:string

    @IsNotEmpty()
    @Length(3, 50)
    country:string

    @IsNotEmpty()
    @IsArray()
    genre:Array<string>
  
}
