import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //

    // 엘라스틱서치를 사용하기 위한 주입
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string, //
  ) {
    // 엘라스틱 서치에서 조회하기 연습!! (연습 이후에는 다시 삭제하기!!)
    //
    const result = await this.elasticsearchService.search({
      index: 'myproduct04',
      query: {
        match: { description: search }, // 일반적인 검색 방법
        // bool : { should: [{ prefix: { description: search } }] } // ngram 없이 검색 가능하지만, 성능이 느림
      },
    });

    console.log(JSON.stringify(result, null, '  '));
    //
    // 엘라스틱 서치에서 조회 해보기 위해 임시로 주석!!
    // return this.productsService.findAll();
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
    // 엘라스틱 서치에 등록하기 연습!! (연습 이후에는 다시 삭제하기!!)
    //
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct04', // myproduct04 collection 에 생성
    //   document: {
    //     name: '철수',
    //     age: 13,
    //     school: '다람쥐초등학교',
    //     ...createProductInput,
    //   },
    // });
    //
    // ElasticSearch에 등록해보기 위해 임시로 주석
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
