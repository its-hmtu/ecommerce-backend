import { IProduct } from './product.interface';

export interface IArchiveProduct {
  id: number;
  productId: number;
  product: IProduct;
  archivedAt: Date;
}
