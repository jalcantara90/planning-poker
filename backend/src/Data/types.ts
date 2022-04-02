export type User = {
  id: string;
  name: string;
  me: boolean;
  selectedCard?: number | string | null;
  isSpectator: boolean;
};
