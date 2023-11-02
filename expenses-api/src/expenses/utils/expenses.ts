import { ExpenseEntity } from 'src/entities/expense.entity';
import { Expenseresult } from '../types/expense-result';

export const serializeExpense = (expense: ExpenseEntity): Expenseresult => ({
  id: expense.id,
  merchant: expense.merchant,
  amount: expense.amount,
  currency: expense.currency,
  date: expense.date.toISOString(),
});
