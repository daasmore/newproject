// @ts-nocheck
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsController } from './invitations.controller';
import { MessagesController } from './messages.controller';
import { InvitationsService } from './invitations.service';
import { GuestsService } from '../guests/guests.service';
import { Invitation } from './entities/invitation.entity';
import { Message } from './entities/message.entity';
import { Guest } from '../guests/entities/guest.entity';
import { InvitationOwnerGuard } from './guards/invitation-owner.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation, Message, Guest]),
    AuthModule,
  ],
  controllers: [InvitationsController, MessagesController],
  providers: [InvitationsService, GuestsService, InvitationOwnerGuard],
  exports: [
    InvitationsService,
    InvitationOwnerGuard,
    TypeOrmModule,
  ],
})
export class InvitationsModule {}
