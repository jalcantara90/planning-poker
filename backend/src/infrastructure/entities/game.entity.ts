import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { VotingSystem } from '@infrastructure/entities';

import { BaseEntity } from './base.entity';

@Entity()
export class Game extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => VotingSystem, votingSystem => votingSystem.game, {})
  @JoinColumn()
  votingSystem: VotingSystem;
}
