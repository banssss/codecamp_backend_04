import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // M:N 은 서로 선언해야합니다. product.entity.ts 를 참조해주세요
  @ManyToMany(() => Product, (products) => products.productTags)
  @Field(() => [Product])
  products: Product[];
}
