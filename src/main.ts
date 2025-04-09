import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

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

  setTimeout(async () => {
    try {
      const typeOrm = app.get('TypeOrmModuleOptions');
      console.log(
        'DB connection status:',
        typeOrm ? 'Connected' : 'Not connected',
      );
    } catch (err) {
      console.log('DB not available, but app is running');
    }
  }, 5000);
}

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
bootstrap().catch((error) => {
  Logger.error('Error during application bootstrap', error, 'Bootstrap');
});
