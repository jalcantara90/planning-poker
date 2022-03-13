import { Column, Entity, OneToMany, JoinTable, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { GameEntity } from './game.entity';
import { VotingSystemOptionEntity } from './voting-system-options.entity';

@Entity({ name: 'voting_system' })
export class VotingSystemEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => GameEntity, game => game.votingSystem)
  game: GameEntity;

  @OneToMany(() => VotingSystemOptionEntity, votingSystemOption => votingSystemOption.votingSystem, { cascade: ['insert', 'update']})
  @JoinTable({ name: VotingSystemOptionEntity.name })
  options: VotingSystemOptionEntity[];
}
