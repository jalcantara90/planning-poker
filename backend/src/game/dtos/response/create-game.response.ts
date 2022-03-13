import { VotingSystem } from "@infrastructure/types";

export class CreateGameResponse {
  constructor(
    public readonly gameId: string,
    public readonly votingSystem: VotingSystem
  ) {}
}
