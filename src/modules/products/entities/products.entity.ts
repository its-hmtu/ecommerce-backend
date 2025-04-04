import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../interfaces/product.interface';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;
}
