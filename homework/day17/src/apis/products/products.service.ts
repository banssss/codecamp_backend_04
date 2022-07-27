import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // fetchProducts (모든상품)
  async findAll() {
    const result = await this.productRepository.find();
    let value;
    // Date 표기 임시처리
    for (value of result) {
      value.termValidity = new Date(value.termValidity);
    }
    return result;
  }

  // fetchProduct (단일상품)
  async findOne({ productId }) {
    const result = await this.productRepository.findOne({
      where: { id: productId },
    });
    // Date 표기 임시처리
    result.termValidity = new Date(result.termValidity);
    return result;
  }

  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      ...createProductInput, // Spread 연산자를 이용하여 한번에 입력받기.
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
}
