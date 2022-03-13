import { Column, Entity, ManyToOne } from 'typeorm';

import { VotingSystemEntity } from '@infrastructure/entities';

import { BaseEntity } from './base.entity';

@Entity({ name: 'voting_system_option' })
export class VotingSystemOptionEntity extends BaseEntity {
  @Column()
  value: string;

  @ManyToOne(() => VotingSystemEntity, votingSystem => votingSystem.options, { cascade: true })
  votingSystem: VotingSystemEntity;
}
