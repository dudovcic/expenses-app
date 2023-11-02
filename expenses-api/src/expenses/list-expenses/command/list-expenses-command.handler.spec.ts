import { TestBed } from '@automock/jest';

import {
  ListExpensesCommand,
  ListExpensesCommandHandler,
} from './list-expenses-command.handler';
import { ExpensesService } from '../../../expenses.service';

describe('SignupCommandHandler', () => {
  let sut: ListExpensesCommandHandler;

  let mockExpensesService: jest.Mocked<ExpensesService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ListExpensesCommandHandler)
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
    mockExpensesService.getExpenses.mockResolvedValue([
      {
        id: 'expense-id',
        expense_name: 'Expense name',
        img: 'http://img.jpg',
        address_line_1: 'Address 1',
        postcode: 'PS3333',
        city: 'London',
        country: 'GB',
        created: new Date(),
        updated: null,
      },
    ]);

    const res = await sut.execute(new ListExpensesCommand());

    expect(res).toEqual([
      {
        id: 'expense-id',
        img: 'http://img.jpg',
        name: 'Expense name',
        address: {
          addressLine1: 'Address 1',
          city: 'London',
          country: 'GB',
          postcode: 'PS3333',
        },
      },
    ]);
  });
});
