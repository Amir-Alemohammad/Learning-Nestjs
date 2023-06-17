import {MinLength,IsOptional,IsNotEmpty , IsNumber , IsString} from "class-validator"
import userGuard from "src/users/dto/userGuards";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title:string;


    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description:string;
    

    @IsNumber()
    @IsOptional()
    price:number;

    @IsOptional()
    user : userGuard
}
