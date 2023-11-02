import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

// TODO: update
import { ExpensesService } from '../../../expenses.service';
import { serializeExpense } from '../../utils/expenses';
import { Expenseresult } from 'src/expenses/types/expense-result';

export class ListExpensesCommand {
  constructor(readonly query: string) {}
}

@CommandHandler(ListExpensesCommand)
export class ListExpensesCommandHandler
  implements ICommandHandler<ListExpensesCommand>
{
  constructor(private expensesService: ExpensesService) {}

  async execute({ query }: ListExpensesCommand): Promise<Expenseresult[]> {
    const expenses = await this.expensesService.getExpenses(query);

    return Promise.resolve(
      expenses.map((expense) => serializeExpense(expense)),
    );
  }
}
