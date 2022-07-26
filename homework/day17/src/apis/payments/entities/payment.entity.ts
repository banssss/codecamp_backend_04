import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', width: 10 })
  paymentAmount: number;

  @Column('varchar', { length: 100 })
  paymentMethod: string;

  @Column({ type: 'mediumint', width: 10 })
  paymentTotal: number;

  @Column({ type: 'date' })
  paymentDate: Date;

  // 구매내역과 제품(밀키트)의 관계는 N:1 관계.
  @ManyToOne(() => Product)
  product: Product;

  // 구매내역과 유저의 관계는 N:1 관계.
  @ManyToOne(() => User)
  user: User;
}
