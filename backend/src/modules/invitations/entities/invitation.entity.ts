// @ts-nocheck
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../auth/entities/user.entity';
import { InvitationSection } from '../../sections/entities/invitation-section.entity';
import { Guest } from '../../guests/entities/guest.entity';
import { Message } from './message.entity';

@Entity('invitations')
export class Invitation extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'uuid', name: 'template_id', nullable: true })
  templateId: string;

  @Column({ type: 'boolean', default: false, name: 'is_published' })
  isPublished: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'music_url' })
  musicUrl: string;

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, any>;

  @OneToMany(() => InvitationSection, (section) => section.invitation)
  sections: InvitationSection[];

  @OneToMany(() => Guest, (guest) => guest.invitation)
  guests: Guest[];

  @OneToMany(() => Message, (msg) => msg.invitation)
  messages: Message[];
}
