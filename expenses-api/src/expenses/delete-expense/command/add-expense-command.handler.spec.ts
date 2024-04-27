import { TestBed } from '@automock/jest';

import {
  AddExpenseCommand,
  AddExpenseCommandHandler,
} from './delete-expense-command.handler';
import { ExpensesService } from '../../../expenses.service';
import { AddExpenseInput } from '../dtos/add-expense.input';
import { ExpenseEntity } from '../../../entities/expense.entity';

describe('AddExpenseCommandHandler', () => {
  let sut: AddExpenseCommandHandler;

  let mockExpensesService: jest.Mocked<ExpensesService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AddExpenseCommandHandler)
      .mock(ExpensesService)
      .using(mockExpensesService)
      .compile();

    sut = unit;

    mockExpensesService = unitRef.get(ExpensesService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return successful response', async () => {
    const expectedRequestBody: AddExpenseInput = {
      merchant: 'Merchant name',
      amount: 133,
      currency: 'GBP',
      date: new Date(),
    };

    const expense1 = new ExpenseEntity();
    expense1.id = 'id-1';
    expense1.merchant = ':expense name';
    expense1.currency = 'GBP';
    expense1.amount = 30.3;

    mockExpensesService.addExpense.mockResolvedValue(expense1);

    const res = await sut.execute(new AddExpenseCommand(expectedRequestBody));

    expect(res).toEqual({
      success: true,
    });
  });
});
