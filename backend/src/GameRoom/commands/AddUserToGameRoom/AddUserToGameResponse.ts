import { User } from "@Data/types";

export class AddUserToGameResponse {
  constructor(
    public userList: User[]
  ) {}
}
