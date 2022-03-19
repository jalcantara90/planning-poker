import { User } from "../user/types";
import { VotingSystem } from "../voting-system/type";

export type Game = {
  name: string;
  votingSystem: VotingSystem;
  members: User[];
}

export type GameOptions = {
  value: string | number;
  isSelected: boolean;
}

export const FibonnacciSystem = {
  id: '1',
  name: 'Fibonnacci',
  options: [ 0, 1, 3, 5, 8, 13, 21, 34, 55, 89, '?' ]
};

export const TShirtSystem = {
  id: '2',
  name: 'Tshirt',
  options: [ 'S', 'M', 'L', 'XL' ]
};

export const votingSystemList = [
  FibonnacciSystem,
  TShirtSystem
];

export type CreateGameRequest = {
  name: string;
  votingSystemId: string;
}

export type CreateGameResponse = {
  id: string;
}
