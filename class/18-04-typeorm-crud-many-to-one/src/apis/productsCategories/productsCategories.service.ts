import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}
  async create({ name }) {
    // DB에 카테고리 등록
    const result = await this.productCategoryRepository.save({ name: name });
    console.log(result); // {id: qwer-wer12, name: 의류}
    return result;
  }
}
