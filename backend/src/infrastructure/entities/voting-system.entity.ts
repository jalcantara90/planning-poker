import { Column, Entity, OneToMany, JoinTable } from 'typeorm';

import { Game } from './game.entity';
import { BaseEntity } from './base.entity';
import { VotingSystemOption } from './voting-system-options.entity';

@Entity()
export class VotingSystem extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Game, game => game.votingSystem)
  game: Game;

  @OneToMany(() => VotingSystemOption, votingSystemOption => votingSystemOption.votingSystem, { cascade: ['insert', 'update']})
  @JoinTable()
  options: VotingSystemOption[];
}
