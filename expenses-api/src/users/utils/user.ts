import { UserResult } from '../types/user-result';
import { UserEntity } from 'src/entities';

export const serializeUser = (user: UserEntity): UserResult => ({
  id: user.id,
  username: user.username,
});
