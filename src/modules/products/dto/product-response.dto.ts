import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductResponseDto {
  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: 'number', description: 'Product ID' })
  @Expose()
  id: number;

  @ApiProperty({ type: 'string' })
  @Expose()
  product_name: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  product_description: string;

  @ApiProperty({ type: 'number' })
  @Expose()
  price: number;

  @ApiProperty({ type: 'string' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: 'string' })
  @Expose()
  updatedAt: Date;
}
