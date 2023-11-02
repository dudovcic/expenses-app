import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';

describe('AppController', () => {
  let appController: ExpensesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        ConfigModule.forRoot({
          envFilePath: [`.env`],
          isGlobal: true,
          load: [config],
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            configService.get('database'),
        }),
      ],
      controllers: [ExpensesController],
      providers: [
        ExpensesService,
        { provide: getRepositoryToken(ExpenseEntity), useValue: jest.fn() },
      ],
    }).compile();

    appController = app.get<ExpensesController>(ExpensesController);
  });

  describe('ExpensesController', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
