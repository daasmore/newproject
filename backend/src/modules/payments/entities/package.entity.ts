// @ts-nocheck
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('packages')
export class Package extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'jsonb', default: [] })
  features: string[];

  @Column({ type: 'int', default: 100, name: 'max_guests' })
  maxGuests: number;

  @Column({ type: 'int', default: 365, name: 'duration_days' })
  durationDays: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;
}
