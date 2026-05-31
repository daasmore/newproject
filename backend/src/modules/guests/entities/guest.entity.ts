// @ts-nocheck
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Invitation } from '../../invitations/entities/invitation.entity';

@Entity('guests')
export class Guest extends BaseEntity {
  @ManyToOne(() => Invitation, (inv) => inv.guests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invitation_id' })
  invitation: Invitation;

  @Column({ name: 'invitation_id' })
  invitationId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'group_name' })
  groupName: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  token: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'attending', 'not_attending'],
    default: 'pending',
    name: 'rsvp_status',
  })
  rsvpStatus: 'pending' | 'attending' | 'not_attending';

  @Column({ type: 'int', default: 1, name: 'rsvp_count' })
  rsvpCount: number;

  @Column({ type: 'text', nullable: true, name: 'rsvp_message' })
  rsvpMessage: string;

  @Column({ type: 'timestamp', nullable: true, name: 'rsvp_at' })
  rsvpAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'reminder_sent_at' })
  reminderSentAt: Date;
}
