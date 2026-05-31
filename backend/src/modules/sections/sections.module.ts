// @ts-nocheck
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { InvitationSection } from './entities/invitation-section.entity';
import { InvitationsModule } from '../invitations/invitations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvitationSection]),
    InvitationsModule, // provides InvitationOwnerGuard + InvitationRepository
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
