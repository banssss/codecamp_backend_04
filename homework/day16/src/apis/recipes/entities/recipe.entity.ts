import { Category } from 'src/apis/categories/entities/category.entity';
import { Level } from 'src/apis/levels/entities/level.entity';
import { Material } from 'src/apis/materials/entities/material.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 100 })
  recipeTitle: string;

  @Column('varchar', { length: 100 })
  recipeSubtitle: string;

  @Column('varchar', { length: 100 })
  recipeDescription: string;

  // 레시피와 카테고리는 N:1 관계
  @ManyToOne(() => Category)
  category: Category;

  // 레시피와 (조리)난이도는 N:1 관계
  @ManyToOne(() => Level)
  level: Level;

  // 레시피와 제품(밀키트)의 관계는 1:1 관계
  @JoinColumn() // 1:1 관계에서, 기준이 되는 Column임을 표현
  @OneToOne(() => Product)
  product: Product;

  // N:M 은 서로 선언해야한다. material.entity.ts 참조
  @ManyToMany(() => Material, (materials) => materials.recipes)
  materials: Material[];
}
