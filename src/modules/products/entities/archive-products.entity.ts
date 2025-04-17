import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IArchiveProduct } from '../interfaces/archive-product.interface';
import { Product } from './products.entity';
import { IProduct } from '../interfaces/product.interface';

@Entity('archive_products')
export class ArchiveProduct implements IArchiveProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: IProduct;

  @CreateDateColumn({ type: 'timestamp' })
  achieveAt: Date;
}
