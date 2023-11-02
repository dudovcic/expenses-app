import BaseEntity from './base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'userz' })
export class UserEntity extends BaseEntity {
  @Column({})
  username: string;
}
