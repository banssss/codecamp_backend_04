import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  // DB에서는 제공하지 않지만, TypeORM 에서 명시적으로 제공
  // @ManyToOne이 필수. 반대편에 있어야만 작성가능, 편의성을 위해 제공해주는 기능
  @OneToMany(() => Product, (products) => products.productCategory)
  products: Product[];
}
