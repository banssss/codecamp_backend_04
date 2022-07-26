import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RecipeLevel {
  EXTREME = 'extreme',
  HARD = 'hard',
  NORMAL = 'normal',
  EASY = 'easy',
}

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: RecipeLevel,
    default: RecipeLevel.EASY,
  })
  level: RecipeLevel;
}
