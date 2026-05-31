import { BaseEntity } from '../../common/entities/base.entity';
import { Invitation } from '../../invitations/entities/invitation.entity';
export declare class InvitationSection extends BaseEntity {
    invitation: Invitation;
    invitationId: string;
    type: 'bride' | 'groom' | 'event' | 'story' | 'gallery' | 'gifts' | 'rsvp';
    content: Record<string, any>;
    orderIndex: number;
    isVisible: boolean;
}
