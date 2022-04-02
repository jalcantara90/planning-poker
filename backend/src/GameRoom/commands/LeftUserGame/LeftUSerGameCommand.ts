import { User } from '@Data/types';

export class LeftUserGameCommand {
  constructor(
    public gameId: string,
    public user: User
  ) {}
}
