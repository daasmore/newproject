import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invitation } from '../entities/invitation.entity';
export declare class InvitationOwnerGuard implements CanActivate {
    private invitationRepository;
    constructor(invitationRepository: Repository<Invitation>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
