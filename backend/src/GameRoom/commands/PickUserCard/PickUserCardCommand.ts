import { User } from '@Data/types';

export class PickUserCardCommand {
  constructor(
    public gameId: string,
    public user: User,
    public selectedValue: string
  ) {}
}
