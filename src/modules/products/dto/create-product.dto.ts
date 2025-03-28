import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber(
    {},
    {
      message: 'Price must be a number',
    },
  )
  price: number;
}
