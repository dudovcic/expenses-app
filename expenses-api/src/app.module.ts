import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { AddExpenseCommandHandler } from './expenses/add-expense';
import { ListExpensesCommandHandler } from './expenses/list-expenses';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { UserEntity } from './entities';
import { UsersController } from './users.controller';
import { ListUsersCommandHandler } from './users/list-users';
import { UsersService } from './users.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
    }),
    TypeOrmModule.forFeature([ExpenseEntity, UserEntity]),
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [UsersController, ExpensesController],
  providers: [
    UsersService,
    ExpensesService,
    ListExpensesCommandHandler,
    AddExpenseCommandHandler,
    ListUsersCommandHandler,
  ],
})
export class AppModule {}
