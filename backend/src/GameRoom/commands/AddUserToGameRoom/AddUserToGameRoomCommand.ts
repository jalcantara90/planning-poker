import { User } from '@Data/types';

export class AddUserToGameRoomCommand {
  constructor(
    public gameId: string,
    public user: User
  ) {}
}
