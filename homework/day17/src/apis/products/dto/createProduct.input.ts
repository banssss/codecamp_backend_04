import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => Date)
  termValidity: Date;

  @Min(0)
  @Field(() => Float)
  productWeight: number;

  @Field(() => String)
  productDescription: string;

  @Min(0)
  @Field(() => Int)
  amount: number;
}
