import { Recipe } from 'src/apis/recipes/entities/recipe.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecipesImg {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 100 })
  recipesImgUrl: string;

  @Column({ type: 'tinyint', width: 1 })
  recipesImgIsmain: boolean;

  // 레시피이미지와 레시피의 관계는 N:1
  @ManyToOne(() => Recipe)
  recipe: Recipe;
}
