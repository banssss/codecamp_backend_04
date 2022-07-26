import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsImg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  productsImgUrl: string;

  // 제품이미지와 제품(밀키트)의 관계는 N:1
  @ManyToOne(() => Product)
  product: Product;
}
