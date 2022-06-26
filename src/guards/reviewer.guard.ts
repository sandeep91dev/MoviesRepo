import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt.auth.guard';

@Injectable()
export class ReviewerGuard implements CanActivate {
  constructor(private userService: UsersService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.getUserById(id);
      return user && user.isReviewer;
    }

    return false;
  }
}