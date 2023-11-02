import { Faker } from '@faker-js/faker';

import { ExpenseEntity } from '../../../entities/expense.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ExpenseFactory = setSeederFactory(
  ExpenseEntity,
  (faker: Faker) => {
    const expense = new ExpenseEntity();
    expense.merchant = `${faker.company.name()}XX`;
    expense.amount = faker.number.int({ min: 0.1, max: 2000 });
    expense.currency = 'GBP';
    expense.date = faker.date.past({ years: 2 });
    expense.user_id = `UserX${faker.number.int({ min: 1, max: 3 })}`;
    return expense;
  },
);
