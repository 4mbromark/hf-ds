import { HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/hf-api');
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.BAD_REQUEST
  }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
