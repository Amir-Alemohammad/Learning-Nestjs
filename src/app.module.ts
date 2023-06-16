import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import {TypeOrmModule} from "@nestjs/typeorm"
import {Users} from './users/entities/user.entities';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host:"localhost",
    port: 5432,
    username: "postgres",
    password: "amir13848431",
    database: "postgres",
    entities: [__dirname + '/**/*.entities{.ts,.js}'],
    synchronize: true, // for production mode this property is false
  }),
  TypeOrmModule.forFeature([Users]),
  ProductsModule,
  UsersModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
