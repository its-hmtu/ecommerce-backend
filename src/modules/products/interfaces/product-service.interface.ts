import { IPaginationMeta } from 'src/common/interfaces/api-response.interface';
import { IArchiveProduct } from './archive-product.interface';
import { IProduct } from './product.interface';

export interface IProductService {
  findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: IProduct[];
    meta: IPaginationMeta;
  }>;
  findById(id: number | string): Promise<IProduct>;
  create(productData: Partial<IProduct>): Promise<IProduct>;
  update(
    id: number | string,
    productData: Partial<IProduct>,
  ): Promise<IProduct | null>;
  delete(id: number | string): Promise<boolean>;
  search(query: string): Promise<IProduct[]>;
  archive(id: number | string): Promise<IArchiveProduct>;
  findAllArchived(
    page: number,
    limit: number,
  ): Promise<{
    data: IArchiveProduct[];
    meta: IPaginationMeta;
  }>;
}
