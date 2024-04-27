import BaseEntity from './base.entity';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ExpenseEntity extends BaseEntity {
  @Column({})
  merchant: string;

  @Column({})
  amount: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ unique: false })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => UserEntity)
  @JoinColumn()
  user_id: string;

  @Column({ default: 'GBP', nullable: true })
  currency: 'GBP';
}
