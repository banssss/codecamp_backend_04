import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSalesLocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductsSubscriber } from './entities/products.subscriber';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, // Repository 추가를 위한 모듈 추가.
      ProductSaleslocation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSubscriber, // 상품 테이블 트리거
  ],
})
export class ProductsModule {}
