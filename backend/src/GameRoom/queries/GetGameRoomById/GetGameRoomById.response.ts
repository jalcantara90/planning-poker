import { User } from "@Data/types";

export class GetGameRoomByIdResponse {
  constructor(
    public userList: User[]
  ) {}
}
