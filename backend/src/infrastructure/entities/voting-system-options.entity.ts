import { Column, Entity, ManyToOne } from 'typeorm';

import { VotingSystem } from '@infrastructure/entities';

import { BaseEntity } from './base.entity';

@Entity()
export class VotingSystemOption extends BaseEntity {
  @Column()
  value: string;

  @ManyToOne(() => VotingSystem, votingSystem => votingSystem.options, { cascade: true })
  votingSystem: VotingSystem;
}
