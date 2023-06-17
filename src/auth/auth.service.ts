import { HttpException , Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import codes from './entities/code.entity';
import { Repository } from 'typeorm';

@Injectable()

export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(codes)
        private codesRepository: Repository<codes>
        ){}

    
    async register(registerDto:RegisterDto){
        const user = await this.userService.findByEmail(registerDto.email);
        
        if(user){
            throw new HttpException("user already exists",400)
        }
        else{
            registerDto.password = await bcrypt.hash(registerDto.password,10);
            return await this.userService.createUser(registerDto)
        }
    }


    async login(loginDto: LoginDto){
        const user = await this.userService.findByEmail(loginDto.email);

        if(!user){
            throw new HttpException("User Not Found",404);
        }

        if(loginDto.code){
            const checkCode = await this.codesRepository.findOne({
                where:{
                    code : loginDto.code,
                    email: loginDto.email,
                    is_used: false,
                }
            });
            if(checkCode){
            await this.codesRepository.update(checkCode,{is_used: true})
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
            
            }else{
                throw new HttpException("Code is Not Valid",400);
            }
        }
        else{
            const otp = await this.generateOtpCode();
            const code = await this.codesRepository.save({
                code: otp,
                email: loginDto.email,
            });
            return {
                code,
            }
        }
        
    }
    async generateOtpCode(){
        let code : number = null;
        while(!code){
            const fiveDigitCode = this.getRandomNumber();
            const checkCode = await this.codesRepository.findOne({
                where:{
                    code : fiveDigitCode,
                }
            });
            if(!checkCode){
                code = fiveDigitCode;
                break;
            }
        }
        return code;
    }
    getRandomNumber(){
        const min = 10000;
        const max = 99999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        return otp;
    }

}
