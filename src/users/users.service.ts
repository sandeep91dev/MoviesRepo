import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { MvloggingService } from 'src/utils/mvlogging/mvlogging.service';

@Injectable()
//TODO: Implement error handling, add logs appropriately, add unit tests
export class UsersService {

  constructor(private readonly logger:MvloggingService){
    this.logger.setContext(UsersService.name);
  }

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

    if(Object.keys(updateObj).length>0){
      this.logger.debug("Update user params "+JSON.stringify(updateObj));
      await User.update(id
      , {
        ...updateObj,
        updatedAt: new Date(),
      });
      this.logger.debug("Update user successful!");
      return "Update user successful!";
    }else{
      this.logger.debug("Nothing to update!")
      return "Nothing to update!";;
    }
    


    
  }

  async deleteUser(id: string) {
    return User.update(
      id,
     {
      deleted: true
    });
}

}
