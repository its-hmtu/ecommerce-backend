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
  UseGuards,
} from '@nestjs/common';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { IProductService } from './interfaces/product-service.interface';
import { ProductService } from './products.service';
import { CreateProductDto, ProductResponseDto } from './dto';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async getAll(): Promise<IApiResponse<ProductResponseDto[]>> {
    const products = await this.productsService.findAll();

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
    const product = await this.productsService.findById(id);

    return {
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(
    @Body() product: CreateProductDto,
  ): Promise<IApiResponse<ProductResponseDto>> {
    const newProduct = await this.productsService.create(product);

    return {
      success: true,
      message: 'Product created successfully',
      data: new ProductResponseDto(newProduct),
    };
  }
}
