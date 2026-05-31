import {
  Controller,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvitationOwnerGuard } from '../invitations/guards/invitation-owner.guard';

@ApiTags('Sections')
@Controller('invitations/:id/sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Put('mempelai')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update info pengantin (bride & groom)' })
  updateMempelai(
    @Param('id') invitationId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.updateOrCreate(invitationId, 'bride', dto);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Put('acara')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update detail acara (akad, resepsi)' })
  updateAcara(
    @Param('id') invitationId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.updateOrCreate(invitationId, 'event', dto);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Put('story')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update love story (array timeline)' })
  updateStory(
    @Param('id') invitationId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.updateOrCreate(invitationId, 'story', dto);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Put('gifts')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update info hadiah (rekening, ewallet)' })
  updateGifts(
    @Param('id') invitationId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.updateOrCreate(invitationId, 'gifts', dto);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Put('rsvp-settings')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update pengaturan RSVP' })
  updateRsvpSettings(
    @Param('id') invitationId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.updateOrCreate(invitationId, 'rsvp', dto);
  }
}
