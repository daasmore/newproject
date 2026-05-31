// @ts-nocheck
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestsController, RsvpController } from './guests.controller';
import { GuestsService } from './guests.service';
import { Guest } from './entities/guest.entity';
import { InvitationsModule } from '../invitations/invitations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guest]),
    InvitationsModule, // provides InvitationOwnerGuard + InvitationRepository
  ],
  controllers: [GuestsController, RsvpController],
  providers: [GuestsService],
  exports: [GuestsService],
})
export class GuestsModule {}
