import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: 'string', description: 'Product Name' })
  @IsString()
  product_name: string;

  @ApiProperty({ type: 'string', description: 'Product Description' })
  @IsString()
  product_description: string;

  @ApiProperty({ type: 'number', description: 'Product Price' })
  @IsNumber(
    {},
    {
      message: 'Price must be a number',
    },
  )
  price: number;
}
