import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductsSubscriber implements EntitySubscriberInterface<Product> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  // Product table 에 등록이 된 이후
  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event);

    const bigQuery = new BigQuery({
      keyFilename: 'gcp-bigquery.json',
      projectId: 'codecamp-backend04',
    });

    bigQuery
      .dataset('mybigquery04')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }

  //   // Product table 에 등록되기 직전
  //   beforeInsert(event: InsertEvent<Product>): void | Promise<any> {}

  //   // Product table 에 삭제된 후
  //   afterRemove(event: RemoveEvent<Product>): void | Promise<any> {}
}
