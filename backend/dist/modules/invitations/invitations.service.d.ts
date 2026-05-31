import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
export declare class InvitationsService {
    private invitationRepository;
    constructor(invitationRepository: Repository<Invitation>);
    create(userId: string, dto: CreateInvitationDto): Promise<Invitation>;
    findAll(userId: string): Promise<Invitation[]>;
    findOne(id: string, userId: string): Promise<Invitation>;
    findBySlug(slug: string): Promise<Invitation>;
    update(id: string, userId: string, dto: UpdateInvitationDto): Promise<Invitation>;
    togglePublish(id: string, userId: string): Promise<Invitation>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    private generateSlug;
}
