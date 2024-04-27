import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

import { ExpenseEntity, UserEntity } from '../../../entities';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    const expensesRepository = dataSource.getRepository(ExpenseEntity);
    const expenseFactory = factoryManager.get(ExpenseEntity);

    const user1 = new UserEntity();
    user1.username = 'UserX1';
    const user2 = new UserEntity();
    user2.username = 'UserX2';
    const user3 = new UserEntity();
    user3.username = 'UserX3';

    const users = await userRepository.save([user1, user2, user3]);
    // const allUsers = await userRepository.find({});

    await Promise.all(
      users.map(async (user) => {
        const expenses = await Promise.all(
          Array(17)
            .fill('')
            .map(async () => {
              console.log('user id', user.id);
              const made = await expenseFactory.make({
                user_id: user.id,
              });
              return made;
            }),
        );
        await expensesRepository.save(expenses);
      }),
    );
  }
}
