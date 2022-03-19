export type User = {
  id: string;
  name: string;
  me: boolean;
  selectedCard?: number | string | null;
  isSpectator: boolean;
}

export type UserPlaces = {
  bottom: User[];
  top: User[];
  right: User[];
  left: User[];
}
