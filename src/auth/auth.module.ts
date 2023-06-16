import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entities';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtService,JwtStrategy]
})
export class AuthModule {}
