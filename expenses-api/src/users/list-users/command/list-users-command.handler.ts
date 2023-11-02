import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersService } from '../../../users.service';
import { serializeUser } from '../../utils/user';
import { UserResult } from 'src/users/types/user-result';

export class ListUsersCommand {}

@CommandHandler(ListUsersCommand)
export class ListUsersCommandHandler
  implements ICommandHandler<ListUsersCommand>
{
  constructor(private usersService: UsersService) {}

  async execute({}: ListUsersCommand): Promise<UserResult[]> {
    const users = await this.usersService.getUsers();

    return Promise.resolve(users.map((user) => serializeUser(user)));
  }
}
