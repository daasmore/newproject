import { BaseEntity } from '../../common/entities/base.entity';
import { Invitation } from './invitation.entity';
export declare class Message extends BaseEntity {
    invitation: Invitation;
    invitationId: string;
    guestName: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
}
