import { SectionsService } from './sections.service';
import { UpdateSectionDto } from './dto/update-section.dto';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    updateMempelai(invitationId: string, dto: UpdateSectionDto): Promise<import("./entities/invitation-section.entity").InvitationSection>;
    updateAcara(invitationId: string, dto: UpdateSectionDto): Promise<import("./entities/invitation-section.entity").InvitationSection>;
    updateStory(invitationId: string, dto: UpdateSectionDto): Promise<import("./entities/invitation-section.entity").InvitationSection>;
    updateGifts(invitationId: string, dto: UpdateSectionDto): Promise<import("./entities/invitation-section.entity").InvitationSection>;
    updateRsvpSettings(invitationId: string, dto: UpdateSectionDto): Promise<import("./entities/invitation-section.entity").InvitationSection>;
}
