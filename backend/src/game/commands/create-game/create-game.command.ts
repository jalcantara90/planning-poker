import { VotingSystem } from "@infrastructure/types";

export class CreateGameCommand {
  constructor(
    public readonly name: string,
    public readonly votingSystem: VotingSystem
  ) {}
}
