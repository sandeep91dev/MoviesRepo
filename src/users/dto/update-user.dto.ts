
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description: string;
}
