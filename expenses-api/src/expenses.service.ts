import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expenseRepository: Repository<ExpenseEntity>,
  ) {}
  async getExpenses(query?: string): Promise<ExpenseEntity[]> {
    if (query) {
      return this.expenseRepository.findBy({ merchant: Like(query) });
    }
    return this.expenseRepository.find({});
  }
  async addExpense(data: {
    merchant: string;
    amount: number;
    currency: 'GBP';
    date: Date;
    userId: string;
  }): Promise<ExpenseEntity> {
    const expense = new ExpenseEntity();

    expense.merchant = data.merchant;
    expense.amount = data.amount;
    expense.currency = data.currency;
    expense.date = data.date;
    expense.user_id = data.userId;

    return this.expenseRepository.save(expense);
  }
}
