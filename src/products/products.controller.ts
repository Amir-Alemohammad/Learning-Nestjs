import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards , Request, Put , HttpException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { jwtAuthGuard } from 'src/Guard/jwt-auth.guard';
import userGuard from 'src/users/dto/userGuards';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseGuards(jwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto, @Request() request) {

    const user : userGuard = request.user;
    createProductDto.user = user;
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@I18n() i18n:I18nContext) {
    throw new HttpException(
    i18n.t("tr.item_not_found",{ args : {item : "User"}})
    ,404)
    // return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(jwtAuthGuard)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto , @Request() request) {
    updateProductDto.user = request.user;
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('remove/:id')
  @UseGuards(jwtAuthGuard)
  remove(@Param('id') id: number , @Request() request) {
    return this.productsService.remove(id,request.user);
  }
}
