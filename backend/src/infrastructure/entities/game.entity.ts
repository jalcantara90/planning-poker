import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import { VotingSystemEntity } from '@infrastructure/entities';

import { BaseEntity } from './base.entity';

@Entity({ name: 'game' })
export class GameEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => VotingSystemEntity)
  @JoinColumn()
  votingSystem: VotingSystemEntity;
}
