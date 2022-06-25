import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/utils/app.utils';
import { UserRoles } from '../../utils/enums/users.enum';

export class CreateUserDto {

    @ApiProperty({
        description: 'The name of the User',
        example: 'Jhon Doe',
      })
      @IsNotEmpty()
      name: string;
    
    @ApiProperty({
        description: 'The email address of the User',
        example: 'jhon.doe@gmail.com',
      })
      @IsNotEmpty()
      @IsEmail()
      email: string;

    @ApiProperty({description:'Role of the user , it can be either of member or reviewer or admin'})
    role: UserRoles;

    @ApiProperty({description:'Role of the user , it can be either of member or reviewer or admin'})
    isReviewer: boolean;

    @ApiProperty({
        description: 'Users favorite movies, genres etc',
        example: 'I just review sci-fi movies',
      })
      description:string;

    // @ApiProperty({
    //     description: 'Identifes if a user allowed to review',
    //     example: 'true',
    // })
    // isReviewer:boolean;
  
    
      @ApiProperty({
        description: 'The password of the User',
        example: 'Password@123',
      })
      @IsNotEmpty()
      @Length(8, 24)
      @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
      password: string;
    
      @ApiProperty({
        description: 'Confirm the password',
        example: 'Password@123',
      })
      @IsNotEmpty()
      @Length(8, 24)
      @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
      confirm: string;
}
