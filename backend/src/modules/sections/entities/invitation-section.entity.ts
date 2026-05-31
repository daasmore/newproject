// @ts-nocheck
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Invitation } from '../../invitations/entities/invitation.entity';

@Entity('invitation_sections')
export class InvitationSection extends BaseEntity {
  @ManyToOne(() => Invitation, (inv) => inv.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invitation_id' })
  invitation: Invitation;

  @Column({ name: 'invitation_id' })
  invitationId: string;

  @Column({
    type: 'enum',
    enum: ['bride', 'groom', 'event', 'story', 'gallery', 'gifts', 'rsvp'],
  })
  type: 'bride' | 'groom' | 'event' | 'story' | 'gallery' | 'gifts' | 'rsvp';

  @Column({ type: 'jsonb', default: {} })
  content: Record<string, any>;

  @Column({ type: 'int', default: 0, name: 'order_index' })
  orderIndex: number;

  @Column({ type: 'boolean', default: true, name: 'is_visible' })
  isVisible: boolean;
}
