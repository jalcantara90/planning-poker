import { User } from "@Data/types";

export class ResetGameResponse {
  constructor(
    public userList: User[]
  ) {}
}
