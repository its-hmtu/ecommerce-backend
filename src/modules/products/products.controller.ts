// src/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { ProductService } from './products.service';
import { CreateProductDto, ProductResponseDto } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get('archived')
  @ApiOperation({
    summary: 'Get all archived products',
    description: 'Retrieve a list of all archived products',
  })
  @ApiResponse({
    status: 200,
    description: 'Archived products retrieved successfully',
    type: ProductResponseDto,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async getAllArchived(): Promise<IApiResponse<ProductResponseDto[]>> {
    const archivedProducts = await this.productsService.findAllArchived();

    return {
      success: true,
      message: 'Archived products retrieved successfully',
      data: archivedProducts.map((product) => new ProductResponseDto(product)),
    };
  }

  @Post('archive')
  @ApiOperation({
    summary: 'Archive a product',
    description: 'Move a product to the archived products list',
  })
  @ApiResponse({
    status: 200,
    description: 'Product archived successfully',
    type: ProductResponseDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async archiveProduct(
    @Query('id', ParseIntPipe) id: number,
  ): Promise<IApiResponse<ProductResponseDto>> {
    const archivedProduct = await this.productsService.archive(id);

    return {
      success: true,
      message: 'Product archived successfully',
      data: new ProductResponseDto(archivedProduct),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Retrieve a list of all products',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
    type: ProductResponseDto,
    isArray: true,
  })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<IApiResponse<ProductResponseDto[]>> {
    const { data, meta } = await this.productsService.findAll(page, limit);
    const products = data.map((product) => new ProductResponseDto(product));
    return {
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      meta: {
        currentPage: meta.currentPage,
        itemsPerPage: meta.itemsPerPage,
        totalItems: meta.totalItems,
        totalPages: meta.totalPages,
      },
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a product by ID',
    description: 'Retrieve a product by its unique ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
    type: ProductResponseDto,
  })
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
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Create a new product with the provided details',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async createProduct(
    @Body() product: CreateProductDto,
  ): Promise<IApiResponse<ProductResponseDto>> {
    const newProduct = await this.productsService.create(product);

    return {
      success: true,
      message: 'Product created successfully',
      data: new ProductResponseDto(newProduct),
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a product',
    description: 'Update an existing product by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: ProductResponseDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: CreateProductDto,
  ): Promise<IApiResponse<ProductResponseDto>> {
    const updatedProduct = await this.productsService.update(id, product);

    return {
      success: true,
      message: 'Product updated successfully',
      data: new ProductResponseDto(updatedProduct),
    };
  }
}
