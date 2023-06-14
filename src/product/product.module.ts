import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[],
  controllers: [ProductController],
  providers: [ProductService,UsersService],
})
export class ProductModule {}
