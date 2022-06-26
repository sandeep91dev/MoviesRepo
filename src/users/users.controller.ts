import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { AuthService } from 'src/users/auth.service';
import {
ApiCreatedResponse,
ApiTags,
ApiBearerAuth
} from '@nestjs/swagger';
import { SETTINGS } from 'src/utils/app.utils';
import { UserExceptionFilter } from 'src/utils/exception-filters/user.exception.filter';


@ApiTags('User')
@Controller('users')
@UseFilters(new UserExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService) {}

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
    return this.authService.generateToken(req.user);
  }

  @Get('')
  findAll() {
    return this.usersService.getAllUsers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('current')
  user(@Request() req): Promise<any> {
    return req.user;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
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
