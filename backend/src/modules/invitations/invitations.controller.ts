import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvitationOwnerGuard } from './guards/invitation-owner.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Invitations')
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buat undangan baru' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateInvitationDto) {
    return this.invitationsService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List undangan milik user' })
  findAll(@CurrentUser('id') userId: string) {
    return this.invitationsService.findAll(userId);
  }

  @Public()
  @Get(':slug/public')
  @ApiOperation({ summary: 'Ambil data undangan publik (untuk halaman tamu)' })
  findBySlug(@Param('slug') slug: string) {
    return this.invitationsService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ambil detail undangan (owner)' })
  findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.invitationsService.findOne(id, userId);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update metadata undangan' })
  update(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateInvitationDto,
  ) {
    return this.invitationsService.update(id, userId, dto);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Put(':id/publish')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle publish/unpublish undangan' })
  togglePublish(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.invitationsService.togglePublish(id, userId);
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus undangan beserta data terkait' })
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.invitationsService.remove(id, userId);
  }
}
