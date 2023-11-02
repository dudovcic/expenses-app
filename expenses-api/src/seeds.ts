import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { ExpenseEntity, UserEntity } from './entities';
import { ExpenseFactory } from './db/seeding/factories/expense.factory';
import { MainSeeder } from './db/seeding/seeds/main.seeder';

const { DB_PORT } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(DB_PORT) || 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  entities: [UserEntity, ExpenseEntity],
  // additional config options brought by typeorm-extension
  factories: [ExpenseFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
