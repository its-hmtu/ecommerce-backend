// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { IProduct } from './interfaces/product.interface';
import { IProductService } from './interfaces/product-service.interface';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ArchiveProduct } from './entities/archive-products.entity';
import { IArchiveProduct } from './interfaces/archive-product.interface';
import { IPaginationMeta } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(ArchiveProduct)
    private archiveProductRepo: Repository<ArchiveProduct>,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: IProduct[];
    meta: IPaginationMeta;
  }> {
    const skip = (page - 1) * limit;
    const take = limit;
    const products = await this.productRepo.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return {
      data: products[0],
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: products[1],
        totalPages: Math.ceil(products[1] / limit),
      },
    };
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
      where: [{ product_name: query }, { product_description: query }],
    });
  }

  async create(product: CreateProductDto): Promise<IProduct> {
    const newProduct = this.productRepo.create(product);
    return await this.productRepo.save(newProduct);
  }

  async update(id: number, product: UpdateProductDto): Promise<IProduct> {
    const existingProduct = await this.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...existingProduct, ...product };
    return await this.productRepo.save(updatedProduct);
  }

  async delete(id: number): Promise<boolean> {
    const product = await this.findById(id);
    await this.productRepo.remove(product);
    return true;
  }

  async archive(id: number): Promise<IArchiveProduct> {
    const product = await this.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    // Move the product to the achieved products table

    // This is a placeholder for the actual implementation
    // You would typically have a separate repository for achieved products
    // and save the product there.
    // For now, we'll just return the product as is.
    const archived = this.archiveProductRepo.create({
      productId: id,
    });
    return await this.archiveProductRepo.save(archived);
  }

  async findAllArchived(): Promise<IArchiveProduct[]> {
    return await this.archiveProductRepo.find({
      relations: ['product'],
      order: { achieveAt: 'DESC' },
    });
  }
}
