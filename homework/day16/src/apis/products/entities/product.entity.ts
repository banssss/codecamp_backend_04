import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 100 })
  productName: string;

  @Column({ type: 'mediumint', width: 10 })
  price: number;

  @Column({ type: 'date' })
  termValidity: Date;

  @Column('decimal', { precision: 5, scale: 1 })
  productWeight: number;

  @Column('varchar', { length: 100 })
  productDescription: string;

  @Column({ type: 'smallint', width: 10 })
  amount: number;
}
