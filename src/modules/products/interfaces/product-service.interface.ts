import { IProduct } from './product.interface';

export interface IProductService {
  findAll(): Promise<IProduct[]>;
  findById(id: number | string): Promise<IProduct>;
  create(productData: Partial<IProduct>): Promise<IProduct>;
  update(
    id: number | string,
    productData: Partial<IProduct>,
  ): Promise<IProduct | null>;
  delete(id: number | string): Promise<boolean>;
  search(query: string): Promise<IProduct[]>;
}
