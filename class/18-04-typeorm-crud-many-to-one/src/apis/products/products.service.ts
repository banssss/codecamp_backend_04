import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSalesLocations/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    }); // JOIN 을 위한 옵션 : relations
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    //
    // const result = await this.productRepository.save({
    //   ...createProductInput,
    //   // 하나하나 직접 나열하는 방식
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });
    // return result;
    //
    // // 2. 상품과 상품 거래 위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: { id: result.id }, // result 통째로 넣기 vs id만 넣기
      // productSaleslocation: result, // 후에 result2 를 프론트로 보내야 할 일이 생깁니다. -> 통째로 보내는 것이 효율적.
      productCategory: { id: productCategoryId },
      // 기획에 따라 다릅니다. 카테고리 이름을 받아오려면, createProduct.input.ts 를 수정하면 됩니다. 혹은 patch 를 하거나..
    });

    return result2;
  }

  async update({ productId, updateProductInput }) {
    // 수정할 때만 사용
    // this.productRepository.update({ id: productId }, { ...updateProductInput });

    // 수정 후 결과값까지 받을 때 사용
    const myProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = this.productRepository.save({
      ...myProduct,
      id: productId,
      ...updateProductInput,
      // 뒤에 입력 받는 놈으로 값을 덮어쓰는 원리 이용
    });
    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    //   // 상태코드는, 개발할 시 프론트앤드 개발자를 위해 표기합니다.
    //   // 개발 후 배포시, 해킹의 위험이 있으니 코드를 뭉뚱그려 전달하기도 합니다.
    // }

    // 에러처리는 try-catch 가 있고, 모든 에러를 처리하는 exception filter 가 있다.
  }

  async delete({ productId }) {
    // 1. 실제로 삭제하는 방법
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 (직접 구현) - isDeleted Column 사용
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 (직접 구현) - deletedAt Column 사용
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제 (TypeORM 제공) - softRemove 메소드 사용
    // this.productRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제 (TypeORM 제공) - softDelete 메소드 사용
    const result = await this.productRepository.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }
}
