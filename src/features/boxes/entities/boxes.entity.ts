import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/products.entity';

@Entity('boxes')
export class Box {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  numberName: number;

  @OneToMany(() => Product, (product) => product.box, {
    cascade: ['remove'],
  })
  products: Product[];

  @Column({ default: false })
  isFull: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
