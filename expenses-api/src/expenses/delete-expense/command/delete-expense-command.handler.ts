import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

// TODO: update
import { ExpensesService } from '../../../expenses.service';

export class DeleteExpenseCommand {
  constructor(readonly id: string) {}
}

@CommandHandler(DeleteExpenseCommand)
export class DeleteExpenseCommandHandler
  implements ICommandHandler<DeleteExpenseCommand>
{
  constructor(private expensesService: ExpensesService) {}

  async execute({ id }: DeleteExpenseCommand): Promise<any> {
    await this.expensesService.deleteExpense(id);

    return Promise.resolve({
      success: true,
    });
  }
}
