import { Recipe } from 'src/apis/recipes/entities/recipe.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 100 })
  material: string;

  // N:M 은 서로 선언해야한다. recipe.entity.ts 참조
  @JoinTable() // N:M 관계에서, 기준인 곳을 명시. (둘 중 어디다 선언해도 상관 없다.)
  @ManyToMany(() => Recipe, (recipes) => recipes.materials)
  recipes: Recipe[];

  // N:M 은 서로 선언해야한다. user.entity.ts 참조
  @JoinTable() // N:M 관계에서, 기준인 곳을 명시. (둘 중 어디다 선언해도 상관 없다.)
  @ManyToMany(() => User, (users) => users.materials)
  users: User[];
}
