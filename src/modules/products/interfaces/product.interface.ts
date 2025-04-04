export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface IProductService {
  getAll(): Promise<IProduct[]>;
  getById(id: number): Promise<IProduct>;
  search(query: string): Promise<IProduct[]>;
  create(product: IProduct): Promise<IProduct>;
  update(id: number, product: IProduct): Promise<IProduct>;
  remove(id: number): Promise<void>;
}
