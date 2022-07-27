import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../recipes/entities/recipe.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    // Recipe Repository 생성
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  // fetchProducts (모든상품)
  async findAll() {
    const result = await this.productRepository.find({
      relations: ['productsCategory', 'recipe'],
    });
    // Date 표기 임시처리
    let value: { termValidity: string | number | Date };
    for (value of result) {
      value.termValidity = new Date(value.termValidity);
    }
    return result;
  }

  // fetchProductsWithDeleted (삭제된 상품을 포함한 모든 상품)
  async findAllWithDeleted() {
    const result = await this.productRepository.find({
      relations: ['productsCategory', 'recipe'],
      withDeleted: true,
    });
    // Date 표기 임시처리
    let value: { termValidity: string | number | Date };
    for (value of result) {
      value.termValidity = new Date(value.termValidity);
    }
    return result;
  }

  // fetchProduct (단일상품)
  async findOne({ productId }) {
    const result = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productsCategory', 'recipe'],
    });
    // Date 표기 임시처리
    result.termValidity = new Date(result.termValidity);
    return result;
  }

  async create({ createProductInput }) {
    // 상품, 상품 카테고리( 그리고, [과제용] 레시피 )를 같이 등록하기.
    const { matchRecipe, productsCategoryId, ...product } = createProductInput;

    // [과제용] 레시피 recipeRepository 에 등록하기.
    const createRecipeResult = await this.recipeRepository.save({
      ...matchRecipe,
    });

    const result = await this.productRepository.save({
      ...product,
      matchRecipe: createRecipeResult, // 저장된 레시피 결과 통째로 넣기
      productsCategory: { id: productsCategoryId }, // id값에 맞는 productsCategory와 연결
      recipe: { id: createRecipeResult.id },
    });
    return result; // 생성된 데이터 정보 리턴
  }

  async update({ productId, updateProductInput }) {
    const myProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    // Repository.update() -> update data 'only'
    // this.productRepository.update({ id: productId }, { ...updateProductInput });

    // Repository.save() -> update data and 'return updated data'
    const result = this.productRepository.save({
      ...myProduct,
      id: productId,
      ...updateProductInput,
      // ...myProduct 를 통해 기존 값을 모두 재 입력
      // ...updateProductInput 을 통해 수정된 값만 재할당
    });
    return result;
  }

  async checkTermValidityOnUpdate({ updateProductInput }) {
    // today - 오늘날짜 | productTermValidity - 입력받은 날짜
    const today = new Date();
    const productTermValidity = new Date(updateProductInput.termValidity);

    if (productTermValidity < today)
      throw new UnprocessableEntityException(
        '유통기한이 지난 상품입니다. 데이터를 수정할 수 없습니다.',
      );
  }

  checkTermValidityOnCreate({ createProductInput }) {
    // today - 오늘날짜 | productTermValidity - 입력받은 날짜
    const today = new Date();
    const productTermValidity = new Date(createProductInput.termValidity);

    if (productTermValidity < today)
      throw new UnprocessableEntityException(
        '유통기한이 지난 상품입니다. 데이터를 등록할 수 없습니다.',
      );
  }

  async delete({ productId }) {
    // 소프트 삭제 (TypeORM 제공) - softDelete 메소드 사용
    const result = await this.productRepository.softDelete({ id: productId }); // id값 이외에 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }

  async restoreDeleted({ productId }) {
    // 삭제된 데이터 복구 - restore 메소드 사용
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
