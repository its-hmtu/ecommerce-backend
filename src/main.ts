import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  setupSwagger(app);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 8080).then(() => {
    Logger.log(
      `Server started on http://localhost:${process.env.PORT ?? 8080}`,
      'Bootstrap',
    );
  });
}

bootstrap().catch((error) => {
  Logger.error('Error during application bootstrap', error, 'Bootstrap');
});
