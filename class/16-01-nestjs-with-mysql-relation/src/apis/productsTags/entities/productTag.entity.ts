import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // M:N 은 서로 선언해야합니다. product.entity.ts 를 참조해주세요
  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[];
}
