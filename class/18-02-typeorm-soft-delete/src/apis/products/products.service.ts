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

  findAll() {
    return this.productRepository.find();
  }

  findOne({ productId }) {
    return this.productRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    return result;
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
