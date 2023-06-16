import {MinLength,IsOptional,IsNotEmpty , IsNumber , IsString} from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly title:string;


    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    readonly description:string;
    

    @IsNumber()
    @IsOptional()
    readonly price:number;
}
