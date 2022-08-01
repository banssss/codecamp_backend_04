import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productsService.create({ createProductInput });
  }

  // 게시글 수정같은 경우에는, 수정해도 되는지의 상태인지를 체크해야 합니다.
  // 로그인상태, 돈의 유무, 경매의 종료유무 등등..
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput, //
  ) {
    // 판매가 완료된 상품은, 수정하면 안됩니다!
    // 판매 완료 상태 확인하기
    await this.productsService.checkSoldout({ productId });
    // 수정하기
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }
}
