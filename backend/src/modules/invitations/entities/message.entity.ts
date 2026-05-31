// @ts-nocheck
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Invitation } from './invitation.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @ManyToOne(() => Invitation, (inv) => inv.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invitation_id' })
  invitation: Invitation;

  @Column({ name: 'invitation_id' })
  invitationId: string;

  @Column({ type: 'varchar', length: 255 })
  guestName: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: 'pending' | 'approved' | 'rejected';
}
