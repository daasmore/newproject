// @ts-nocheck
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Header,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestQueryDto } from './dto/guest-query.dto';
import { SubmitRsvpDto } from './dto/submit-rsvp.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvitationOwnerGuard } from '../invitations/guards/invitation-owner.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('RSVP')
@Public()
@Controller('rsvp')
export class RsvpController {
  constructor(private readonly guestsService: GuestsService) {}

  @Get(':guestToken')
  @ApiOperation({ summary: 'Ambil data tamu berdasarkan token' })
  findByToken(@Param('guestToken') token: string) {
    return this.guestsService.findByToken(token);
  }

  @Post(':guestToken')
  @ApiOperation({ summary: 'Submit RSVP' })
  submitRsvp(
    @Param('guestToken') token: string,
    @Body() dto: SubmitRsvpDto,
  ) {
    return this.guestsService.submitRsvp(token, dto);
  }
}

@ApiTags('Guests')
@Controller('invitations/:id/guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List tamu dengan pagination, filter, search' })
  findAll(
    @Param('id') invitationId: string,
    @Query() query: GuestQueryDto,
  ) {
    return this.guestsService.findAllByInvitation(invitationId, query);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah tamu manual' })
  create(
    @Param('id') invitationId: string,
    @Body() dto: CreateGuestDto,
  ) {
    return this.guestsService.addGuest(invitationId, dto);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Post('import')
  @ApiBearerAuth()
  @ApiConsumes('text/csv', 'multipart/form-data')
  @ApiOperation({ summary: 'Import tamu dari CSV' })
  importCsv(
    @Param('id') invitationId: string,
    @Body('csvData') csvData: string,
  ) {
    if (!csvData) {
      throw new BadRequestException('CSV data required');
    }
    return this.guestsService.importFromCsv(invitationId, csvData);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Get('export')
  @ApiBearerAuth()
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="tamu.csv"')
  @ApiOperation({ summary: 'Download semua data tamu sebagai CSV' })
  async exportCsv(
    @Param('id') invitationId: string,
    @Res() res: Response,
  ) {
    const csv = await this.guestsService.exportToCsv(invitationId);
    res.send(csv);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Get('form-link')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate magic link form registrasi mandiri' })
  getFormLink(@Param('id') invitationId: string) {
    return this.guestsService.getFormLink(invitationId);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Delete(':guestId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus tamu' })
  remove(
    @Param('id') invitationId: string,
    @Param('guestId') guestId: string,
  ) {
    return this.guestsService.remove(guestId, invitationId);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Get('stats')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Statistik tamu & RSVP' })
  getStats(@Param('id') invitationId: string) {
    return this.guestsService.getStats(invitationId);
  }
}
