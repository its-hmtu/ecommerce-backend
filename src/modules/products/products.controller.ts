// src/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductResponseDto } from './dto/product.dto';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { IProductService } from './interfaces/product.interface';
import { throws } from 'assert';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('IProductService')
    private readonly productsService: IProductService,
  ) {}

  @Get()
  async getAll(): Promise<IApiResponse<ProductResponseDto[]>> {
    const products = await this.productsService.getAll();

    return {
      success: true,
      message: 'Products retrieved successfully',
      data: products.map((product) => new ProductResponseDto(product)),
    };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<ProductResponseDto>> {
    const product = await this.productsService.getById(id);

    return {
      success: true,
      message: 'Product retrieved successfully',
      data: new ProductResponseDto(product),
    };
  }
}
