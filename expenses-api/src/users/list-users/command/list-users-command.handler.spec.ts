import { TestBed } from '@automock/jest';

import {
  ListUsersCommand,
  ListUsersCommandHandler,
} from './list-users-command.handler';
import { UsersService } from '../../../users.service';

describe('ListUsersCommandHandler', () => {
  let sut: ListUsersCommandHandler;

  let mockusersService: jest.Mocked<UsersService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ListUsersCommandHandler)
      .mock(UsersService)
      .using(mockusersService)
      .compile();

    sut = unit;

    mockusersService = unitRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return successful response', async () => {
    mockusersService.getUsers.mockResolvedValue([
      {
        id: 'expense-id',
        username: 'Expense name',
        created: new Date(),
        updated: null,
      },
    ]);

    const res = await sut.execute(new ListUsersCommand());

    expect(res).toEqual([
      {
        id: 'expense-id',
        username: 'UserX1',
      },
    ]);
  });
});
