export type Game = {
  name: string;
  votingSystem: VotingSystem;
  members: User[];
}

export type VotingSystem = {
  id: string;
  name: string;
  options: Array<number | string>;
}

export type User = {
  name: string;
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