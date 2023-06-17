import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import {TypeOrmModule} from "@nestjs/typeorm"
import {Users} from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { HeaderResolver } from 'nestjs-i18n/dist/resolvers/header.resolver';
import { QueryResolver } from 'nestjs-i18n/dist/resolvers/query.resolver'; 
import { AcceptLanguageResolver } from 'nestjs-i18n/dist/resolvers/accept-language.resolver'; 

import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname , '..','src','/i18n/'),
        watch: true,
      },
      resolvers:[
        new HeaderResolver(['x-custom-lang']),
        new QueryResolver(['lang']),
        new AcceptLanguageResolver()
      ]
    }),
    TypeOrmModule.forRoot({
    type: "postgres",
    host:"localhost",
    port: 5432,
    username: "postgres",
    password: "amir13848431",
    database: "postgres",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
