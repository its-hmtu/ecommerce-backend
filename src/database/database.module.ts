import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          return {
            type: 'postgres',
            host: config.get('DB_HOST'),
            port: config.get<number>('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASS'),
            database: config.get('DB_NAME'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
          };
        } catch (error) {
          console.error(
            '⚠️ Error loading database configuration:',
            error.message,
          );
          return {};
        }
      },
    }),
  ],
})
export class DatabaseModule {}
