import { Column, Entity } from 'typeorm';

import { VotingSystem } from '../types';
import { BaseEntity } from './base.entity';

@Entity({ name: 'game' })
export class GameEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  votingSystem: VotingSystem;
}