import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
ApiCreatedResponse,
ApiTags
} from '@nestjs/swagger';
import { SETTINGS } from 'src/utils/app.utils';
import { UserExceptionFilter } from 'src/utils/exception-filters/user.exception.filter';


@ApiTags('User')
@Controller('users')
@UseFilters(new UserExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Create user successful',
    type: User,
  })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.doUserRegistration(userRegister);
  }

  @Get('')
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getFilm(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
