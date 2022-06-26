import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class LoginDto {

@ApiProperty({
    description: 'The email address of the User',
    example: 'jhon.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

@ApiProperty({
description: 'The password of the User',
example: 'Password@123',
})
@IsNotEmpty()
@Length(8, 24)
password: string;

}