import {IsEmail , IsNotEmpty, IsOptional} from "class-validator"


export class LoginDto{
    
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsOptional()
    code:number
}