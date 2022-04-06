export class CreateGameCommand {
  constructor(
    public readonly name: string,
    public readonly  votingSystemId: string
  ) {}
}
