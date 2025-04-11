// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { IProduct } from './interfaces/product.interface';
import { IProductService } from './interfaces/product-service.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<IProduct[]> {
    return await this.productRepo.find();
  }

  async findById(id: number): Promise<IProduct> {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async search(query: string): Promise<IProduct[]> {
    return await this.productRepo.find({
      where: [{ name: query }, { description: query }],
    });
  }

  async create(product: CreateProductDto): Promise<IProduct> {
    const newProduct = this.productRepo.create(product);
    return await this.productRepo.save(newProduct);
  }

  async update(id: number, product: UpdateProductDto): Promise<IProduct> {
    const existingProduct = await this.findById(id);
    const updatedProduct = { ...existingProduct, ...product };
    return await this.productRepo.save(updatedProduct);
  }

  async delete(id: number): Promise<boolean> {
    const product = await this.findById(id);
    await this.productRepo.remove(product);
    return true;
  }
}
