import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { LocalStrategy } from '../guards/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../guards/jwt.auth.strategy';
import { jwtConfig } from '../config/jwt.config';
import { AuthService } from './auth.service';
import { MvloggingModule } from 'src/utils/mvlogging/mvlogging.module';
import { MvloggingService } from 'src/utils/mvlogging/mvlogging.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),PassportModule, JwtModule.registerAsync(jwtConfig), MvloggingModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy, MvloggingService],
  exports:[UsersService]
})
export class UsersModule {}
