import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
})
export class AdminModule {}

export const AdminModulePrefix = {
  module: AdminModule,
  prefix: 'admin',
};
