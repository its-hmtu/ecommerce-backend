import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
// import { ProductsModule } from './admin/products/products.module';
import { DataSource } from 'typeorm';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DatabaseModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1');
      Logger.log('✅ Database is connected', 'Database');
    } catch (error) {
      Logger.error('❌ Database connection failed', error, 'Database');
    }
  }
}
