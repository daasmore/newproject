import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../auth/entities/user.entity';
import { InvitationSection } from '../../sections/entities/invitation-section.entity';
import { Guest } from '../../guests/entities/guest.entity';
import { Message } from './message.entity';
export declare class Invitation extends BaseEntity {
    user: User;
    userId: string;
    slug: string;
    title: string;
    templateId: string;
    isPublished: boolean;
    musicUrl: string;
    settings: Record<string, any>;
    sections: InvitationSection[];
    guests: Guest[];
    messages: Message[];
}
