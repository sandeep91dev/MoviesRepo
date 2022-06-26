import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

  constructor(
  ){}

  async doUserRegistration(
    userRegister: CreateUserDto,
  ): Promise<User> {
    const user = new User();

    user.userId = uuidv4();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;
    if(userRegister.role) user.role = userRegister.role;
    if(userRegister.isReviewer) user.isReviewer = userRegister.isReviewer;

    return await user.save();
    
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    console.log("User")
    return User.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[] | []> {
    return User.find({where:{deleted:false}});
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return User.findOneBy({ userId});
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
