import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddExpenseCommand } from './expenses/add-expense';
import { ListExpensesCommand } from './expenses/list-expenses';
import { AddExpenseInput } from './expenses/add-expense/dtos/add-expense.input';
import { Expenseresult } from './expenses/types/expense-result';

@Controller('/expenses')
export class ExpensesController {
  constructor(private commandBus: CommandBus) {}

  @Get()
  async getExpenses(@Query('query') query: string): Promise<Expenseresult[]> {
    return this.commandBus.execute(new ListExpensesCommand(query));
    // return this.appService.getExpenses();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addExpense(@Body() body: AddExpenseInput): Promise<Expenseresult> {
    return this.commandBus.execute(new AddExpenseCommand(body));
    // return this.appService.addExpense(body);
  }
}
