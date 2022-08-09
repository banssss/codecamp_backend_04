import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { ProductsImg } from '../productsImgs/entities/productsImg.entity';
import { ProductsTag } from '../productsTags/entities/productsTag.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    // Recipe Repository Inject
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,

    // ProductsTag Repository Inject
    @InjectRepository(ProductsTag)
    private readonly productsTagRepository: Repository<ProductsTag>,

    // ProductsImg Repository Inject
    @InjectRepository(ProductsImg)
    private readonly productsImgRepository: Repository<ProductsImg>,

    // files service
    private readonly filesService: FilesService,
  ) {}

  // fetchProducts (모든상품)
  async findAll() {
    const result = await this.productRepository.find({
      relations: ['productsCategory', 'matchRecipe', 'productsTags'],
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
      relations: ['productsCategory', 'matchRecipe', 'productsTags'],
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
      relations: ['productsCategory', 'matchRecipe', 'productsTags'],
    });
    // Date 표기 임시처리
    result.termValidity = new Date(result.termValidity);
    return result;
  }

  async create({ createProductInput }) {
    // 상품, 상품 카테고리( 그리고, [과제용] 레시피 ), 상품 이미지를 같이 등록하기.
    const {
      matchRecipe,
      productsCategoryId,
      productsTags,
      productsImgs,
      ...product
    } = createProductInput;

    // [과제용] 레시피 recipeRepository 에 등록하기.
    const createRecipeResult = await this.recipeRepository.save({
      ...matchRecipe,
    });

    // productsTags 모두 등록하기 Promise.all 적용
    const createdTags = await Promise.all(
      productsTags.map(
        (el: string) =>
          new Promise(async (resolve) => {
            const tagName = el.replace('#', '');
            const prevTag = await this.productsTagRepository.findOne({
              where: { name: tagName },
            });
            if (prevTag) {
              resolve(prevTag);
            } else {
              const newTag = await this.productsTagRepository.save({
                name: tagName,
              });
              resolve(newTag);
            }
          }),
      ),
    );

    // const createdTags = [];
    // for (let i = 0; i < productsTags.length; i++) {
    //   //tag에서 해시태그(#)제거
    //   const tagName = productsTags[i].replace('#', '');

    //   // 입력받은 tagName이 이미 productsTagRepository에 저장되었는지 찾아보기 위한 prevTag
    //   const prevTag = await this.productsTagRepository.findOne({
    //     where: { name: tagName },
    //   });

    //   // 이미 태그가 존재한다면
    //   if (prevTag) {
    //     createdTags.push(prevTag);
    //     // 존재하는 태그가 없다면
    //   } else {
    //     const newTag = await this.productsTagRepository.save({
    //       name: tagName,
    //       // N:M 관계는, 둘 중 하나만 연결해주면 둘 다 연결된다.
    //     });
    //     createdTags.push(newTag);
    //   }
    // }

    // product 정보 저장
    const result = await this.productRepository.save({
      ...product,
      productsCategory: { id: productsCategoryId }, // id값에 맞는 productsCategory와 연결
      matchRecipe: createRecipeResult, // 저장된 레시피 결과 통째로 넣기
      productsTags: createdTags, // 생성된 태그 결과 넣기
    });

    // 클라이언트에게 입력받은 상품 이미지 생성하여 함께 입력하기
    const createdImgs = await Promise.all(
      productsImgs.map(
        (imgUrl: any) =>
          new Promise(async (resolve) => {
            const newImg = await this.productsImgRepository.save({
              productsImgUrl: imgUrl,
              product: { id: result.id }, // product 와 img 연결
            });
            resolve(newImg);
          }),
      ),
    );
    // 생성된 이미지 출력 테스트
    console.log(createdImgs);

    return result; // 생성된 데이터 정보 리턴
  }

  async update({ productId, updateProductInput }) {
    const myProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    //  productsImgs 분리하기
    const { productsImgs, ...updateInput } = updateProductInput;

    // productImgs 입력된 경우
    if (productsImgs) {
      // 기존 id에 속한 이미지 모두 불러오기
      const prevImgs = await this.productsImgRepository.find({
        where: { product: { id: productId } },
      });
      // 불러온 기존 이미지에서 파일이름 추출
      const fileNames = prevImgs.map((el) =>
        el.productsImgUrl.replace('codecamp-backend04-storage/', ''),
      );

      // 이미지 테이블에서 상품 id가 일치하는 데이터 모두 삭제하기 (과제 1번로직 -> 2번단계)
      await this.productsImgRepository.delete({ product: { id: productId } });
      // 실제 cloud에서 파일 삭제하기 (과제 Advanced)
      await this.filesService.delete({ fileNames });

      // Promise.all 을 이용하여, 입력받은 이미지들 저장하기
      // const updateImgs = await Promise.all(
      await Promise.all(
        productsImgs.map(
          (imgUrl: any) =>
            new Promise(async (resolve) => {
              const newImg = await this.productsImgRepository.save({
                productsImgUrl: imgUrl,
                product: { id: productId }, // product 와 img 연결
              });
              resolve(newImg);
            }),
        ),
      );
      // console.log(updateImgs); // 업데이트 된 이미지 테스트 출력
    }

    // Repository.update() -> update data 'only'
    // this.productRepository.update({ id: productId }, { ...updateProductInput });

    // Repository.save() -> update data and 'return updated data'
    const result = this.productRepository.save({
      ...myProduct,
      id: productId,
      ...updateInput,
      // ...myProduct 를 통해 기존 값을 모두 재 입력
      // ...updateInput 을 통해 수정된 값만 재할당
    });
    return result;
  }

  checkTermValidityOnUpdate({ updateProductInput }) {
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
