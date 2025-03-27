import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));
  
  await app.listen(process.env.PORT ?? 8080).then(() => {
    Logger.log(
      `Server started on http://localhost:${process.env.PORT ?? 8080}`,
      'Bootstrap',
    );
  });
}

bootstrap();
