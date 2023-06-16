import { HttpException , Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class AuthService {
    
    constructor(private readonly userService: UsersService,private readonly jwtService: JwtService){}

    
    async register(registerDto:RegisterDto){
        const user = await this.userService.findByEmail(registerDto.email);
        
        if(user){
            throw new HttpException("user already exists",400)
        }else{
            registerDto.password = await bcrypt.hash(registerDto.password,10);
            return await this.userService.createUser(registerDto)
        }
    }


    async login(loginDto: LoginDto){
        const user = await this.userService.findByEmail(loginDto.email);   
        if(!user){
            throw new HttpException("User Not Found",404);
        }
       
        const passwordMatch = await bcrypt.compare(loginDto.password,user.password);
        if(!passwordMatch){
            throw new HttpException("Wrong Password",400);
        }
        const accessToken = this.jwtService.sign({
            email: user.email,
            id: user.id
        },{
            expiresIn: "1d",
            secret: "secret"
        });
        return {
            email: user.email,
            accessToken,
        };
    }


}
