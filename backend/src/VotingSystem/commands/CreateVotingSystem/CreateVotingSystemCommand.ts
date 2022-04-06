export class CreateVotingSystemCommand {
  constructor(
    readonly name: string,
    readonly options: string[]
  ) {}
}
