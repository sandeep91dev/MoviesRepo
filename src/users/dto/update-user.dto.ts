
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../utils/enums/users.enum';

export class UpdateUserDto {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({description:'Role of the user , it can be either of member or reviewer or admin'})
  role: UserRoles;

  @ApiProperty({description:'Role of the user , it can be either of member or reviewer or admin'})
  isReviewer: boolean;
}
