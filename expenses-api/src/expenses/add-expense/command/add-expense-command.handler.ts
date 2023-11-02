import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

// TODO: update
import { AddExpenseInput } from '../dtos/add-expense.input';
import { ExpensesService } from '../../../expenses.service';

export class AddExpenseCommand {
  constructor(readonly input: AddExpenseInput) {}
}

@CommandHandler(AddExpenseCommand)
export class AddExpenseCommandHandler
  implements ICommandHandler<AddExpenseCommand>
{
  constructor(private expensesService: ExpensesService) {}

  async execute({ input }: AddExpenseCommand): Promise<any> {
    const data = {
      merchant: input.merchant,
      amount: input.amount,
      currency: input.currency,
      date: input.date,
      userId: input.userId,
    };

    await this.expensesService.addExpense(data);

    return Promise.resolve({
      success: true,
    });
  }
}
