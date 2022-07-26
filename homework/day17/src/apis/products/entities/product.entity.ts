import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  productName: string;

  @Column({ type: 'mediumint', width: 10 })
  @Field(() => Int)
  price: number;

  @Column({ type: 'date' })
  // @Field(() => Date) Date 형식으로 출력 시 ...to return non-nullable value, returned: null 오류 출력... 이유 찾는중
  @Field(() => String) // 날짜 데이터 문자열로 출력.
  termValidity: Date;

  @Column('decimal', { precision: 5, scale: 1 })
  @Field(() => Float)
  productWeight: number;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  productDescription: string;

  @Column({ type: 'smallint', width: 10, default: 0 })
  @Field(() => Int)
  amount: number;
}
