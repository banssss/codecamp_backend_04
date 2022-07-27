import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, // Repository 추가를 위한 모듈 추가.
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
  ],
})
export class ProductsModule {}
