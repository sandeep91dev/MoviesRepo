import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
  ){}

  async doUserRegistration(
    userRegister: CreateUserDto,
  ): Promise<User> {
    const user = new User();

    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;

    return await user.save();
    
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[] | []> {
    return User.find({where:{deleted:false}});
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updateObj = {};
    if(updateUserDto.name) updateObj['name'] = updateUserDto.name;
    if(updateUserDto.description) updateObj['description'] = updateUserDto.description;
    const user = await User.update(id
    , {
      ...updateObj,
      updatedAt: new Date(),
    });

    return user;
    
  }

  async deleteUser(id: string) {
    return User.update(
      id,
     {
      deleted: true
    });
}

}
