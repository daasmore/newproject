// @ts-nocheck
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('templates')
export class Template extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'thumbnail_url' })
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'preview_url' })
  previewUrl: string;

  @Column({ type: 'enum', enum: ['free', 'premium'], default: 'free' })
  tier: 'free' | 'premium';

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;
}
