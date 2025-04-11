import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  // Setup Swagger documentation
  setupSwagger(app);

  // Enable request logging
  app.use(morgan('dev'));

  // Enable CORS for all origins
  app.enableCors();

  // Set global prefix for API routes
  app.setGlobalPrefix('api');

  // Enable global interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // Enable global guards
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
