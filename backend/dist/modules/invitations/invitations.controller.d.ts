import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
export declare class InvitationsController {
    private readonly invitationsService;
    constructor(invitationsService: InvitationsService);
    create(userId: string, dto: CreateInvitationDto): Promise<import("./entities/invitation.entity").Invitation>;
    findAll(userId: string): Promise<import("./entities/invitation.entity").Invitation[]>;
    findBySlug(slug: string): Promise<import("./entities/invitation.entity").Invitation>;
    findOne(id: string, userId: string): Promise<import("./entities/invitation.entity").Invitation>;
    update(id: string, userId: string, dto: UpdateInvitationDto): Promise<import("./entities/invitation.entity").Invitation>;
    togglePublish(id: string, userId: string): Promise<import("./entities/invitation.entity").Invitation>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
