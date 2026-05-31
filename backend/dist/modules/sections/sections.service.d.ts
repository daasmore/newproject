import { Repository } from 'typeorm';
import { InvitationSection } from './entities/invitation-section.entity';
import { UpdateSectionDto } from './dto/update-section.dto';
export declare class SectionsService {
    private sectionRepository;
    constructor(sectionRepository: Repository<InvitationSection>);
    updateOrCreate(invitationId: string, type: string, dto: UpdateSectionDto): Promise<InvitationSection>;
}
