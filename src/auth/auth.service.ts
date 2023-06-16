import { HttpException , Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService){}

    
    async register(registerDto:RegisterDto){
        const user = await this.userService.findByEmail(registerDto.email);
        
        if(user){
            throw new HttpException("user already exists",400)
        }else{
            registerDto.password = await bcrypt.hash(registerDto.password,10);
            return await this.userService.createUser(registerDto)
        }
    }


    async login(){
        
    }


}
