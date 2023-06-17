import {IsEmail , IsString , IsNumber, IsNotEmpty , } from "class-validator"

export class RegisterDto{

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsString()
    firstname:string;

    @IsString()
    lastname:string;

    @IsString()
    @IsNotEmpty()
    password:string;
    
    @IsNumber()
    age:number;
}