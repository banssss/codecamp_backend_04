import { Field, ObjectType } from '@nestjs/graphql';
import { Material } from 'src/apis/materials/entities/material.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  userAccount: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  password: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  name: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  nickname: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  phone: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  email: string;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  point: number;

  @Column('varchar', { length: 100 })
  @Field(() => String)
  creditInfo: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  signupDate: Date;

  @Column({ type: 'tinyint', width: 1 })
  @Field(() => Boolean)
  isSignout: boolean;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  signoutDate: Date;

  // N:M 은 서로 선언해야한다. material.entity.ts 참조
  @ManyToMany(() => Material, (materials) => materials.users)
  @Field(() => [Material])
  materials: Material[];
}
