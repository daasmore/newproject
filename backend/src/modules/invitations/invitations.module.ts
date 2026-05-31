import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { Invitation } from './entities/invitation.entity';
import { Message } from './entities/message.entity';
import { InvitationOwnerGuard } from './guards/invitation-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation, Message])],
  controllers: [InvitationsController],
  providers: [InvitationsService, InvitationOwnerGuard],
  exports: [InvitationsService, InvitationOwnerGuard],
})
export class InvitationsModule {}
