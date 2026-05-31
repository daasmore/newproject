import { BaseEntity } from '../../common/entities/base.entity';
import { Invitation } from '../../invitations/entities/invitation.entity';
export declare class Guest extends BaseEntity {
    invitation: Invitation;
    invitationId: string;
    name: string;
    phone: string;
    groupName: string;
    token: string;
    rsvpStatus: 'pending' | 'attending' | 'not_attending';
    rsvpCount: number;
    rsvpMessage: string;
    rsvpAt: Date;
    reminderSentAt: Date;
}
