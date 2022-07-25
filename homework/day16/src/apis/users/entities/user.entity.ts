import { Material } from 'src/apis/materials/entities/material.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  userAccount: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  nickname: string;

  @Column('varchar', { length: 100 })
  phone: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 100 })
  point: number;

  @Column('varchar', { length: 100 })
  creditInfo: string;

  @Column({ type: 'timestamp' })
  signupDate: Date;

  @Column({ type: 'tinyint', width: 1 })
  isSignout: boolean;

  @Column({ type: 'timestamp' })
  signoutDate: Date;

  // N:M 은 서로 선언해야한다. material.entity.ts 참조
  @ManyToMany(() => Material, (materials) => materials.users)
  materials: Material[];
}
