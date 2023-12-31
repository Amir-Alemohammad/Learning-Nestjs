import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from "passport";
import * as session from "express-session"
import {ValidationPipe} from "@nestjs/common"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(session({
    secret: "secret",
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  
  await app.listen(3000);
}
bootstrap();
