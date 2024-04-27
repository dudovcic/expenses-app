import { IsNotEmpty } from 'class-validator';

export class AddExpenseInput {
  @IsNotEmpty()
  merchant: string;

  @IsNotEmpty()
  amount: number;

  currency: 'GBP';

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  userId: string;
}
