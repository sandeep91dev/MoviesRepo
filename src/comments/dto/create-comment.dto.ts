import { IsArray, IsEnum, IsInstance, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @Length(3, 300)
    comment:string;
  
    @IsNotEmpty()
    filmId: string;

    @IsNotEmpty()
    @Length(3, 50)
    userId:string

   
}
