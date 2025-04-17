import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ArchiveProduct } from './entities/archive-products.entity';

@Module({
  providers: [ProductService],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, ArchiveProduct])],
})
export class ProductsModule {}
