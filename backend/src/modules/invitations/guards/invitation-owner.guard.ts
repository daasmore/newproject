// @ts-nocheck
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from '../entities/invitation.entity';

@Injectable()
export class InvitationOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const invitationId = request.params.id;

    if (!invitationId) {
      return true;
    }

    const invitation = await this.invitationRepository.findOne({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new NotFoundException('Undangan tidak ditemukan');
    }

    if (invitation.userId !== user.id) {
      throw new ForbiddenException('Anda tidak memiliki akses ke undangan ini');
    }

    request.invitation = invitation;
    return true;
  }
}
