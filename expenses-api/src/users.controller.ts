import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ListUsersCommand } from './users/list-users';
import { UserResult } from './users/types/user-result';

@Controller('/users')
export class UsersController {
  constructor(private commandBus: CommandBus) {}

  @Get()
  async getUsers(): Promise<UserResult[]> {
    return this.commandBus.execute(new ListUsersCommand());
  }
}
