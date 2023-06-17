import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import userGuard from 'src/users/dto/userGuards';



@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ){}

   create = async (createProductDto: CreateProductDto) => {
      const product = await this.productRepository.save(createProductDto);
      return {
        statusCode: 201,
        message: "product created",
        product
      }
  }

  async findAll() {
    const AllProducts = await this.productRepository.find()
    return {
      AllProducts
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      relations:{
        user: true,
      },
      where:{
        id,
      }
    });
    if(!product){
      throw new HttpException("product Not Found",404);
    }
    return {
      product,
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const check = await this.productRepository.update({id , user : updateProductDto.user },{ ...updateProductDto });
    if(check.affected === 0){
      throw new HttpException("products Not Found",404);
    }
    return {
      statusCode:200,
      message:"product Updated"
    };
  }

  async remove(id: number , user:userGuard) {
    const check = await this.productRepository.createQueryBuilder("Products")
    .leftJoinAndSelect("Products.user",'user')
    .where('Products.id = :id',{id})
    .andWhere('Products.user = :user',{user : user.id})
    .getOne();
    if(!check){
      throw new HttpException("Product Not Found",404);
    }    
    await this .productRepository.remove(check)
    return {
      message: "product deleted!"
    }
  }
}
