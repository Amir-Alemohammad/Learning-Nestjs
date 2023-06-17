import {Injectable } from '@nestjs/common';
import {Users} from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(Users)
      private userRepository: Repository<Users>
   ){}
   createUser = async (data: CreateUserDto) => {
     const user = await this.userRepository.create(data);
     this.userRepository.save(user);
     return {
         statusCode:201,
         message: "Success",
         user,
     };
   }
   findByEmail = async (email:string) => {
      return await this.userRepository.findOne({
         where: {
            email : email
         }
      });
   }
}
