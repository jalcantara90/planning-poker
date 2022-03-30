import { User, UserPlaces } from "../shared/user/types";

export function buildUsersPlace(userList: User[]): UserPlaces {
  return userList
    .sort((a) => a.me ? -1 : 1)
    .reduce<UserPlaces>((acc, current, index) => {
      acc[indexPlaces[index]].push(current);
      return acc;
    }, {
      bottom: [],
      top: [],
      right: [],
      left: []
    }
  );
}

const indexPlaces: { [key: number]: 'bottom' | 'top' | 'left' | 'right' } = {
  0: 'bottom',
  1: 'top',
  2: 'bottom',
  3: 'top',
  4: 'bottom',
  5: 'top',
  6: 'right',
  7: 'left',
  8: 'right',
  9: 'left',
  10: 'bottom',
  11: 'top',
};
