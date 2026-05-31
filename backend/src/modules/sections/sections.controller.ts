import {
  Controller,
  Put,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
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

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Post('gallery')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpeg|jpg|png|webp)$/)) {
        return cb(new Error('Only image files (jpeg, png, webp) allowed'), false);
      }
      cb(null, true);
    },
  }))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload foto galeri (MinIO ready)' })
  uploadGallery(
    @Param('id') invitationId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // TODO: Integrate with MinIO
    // For now, return placeholder URL
    return {
      message: 'Upload successful',
      filename: file?.originalname,
      size: file?.size,
      mimetype: file?.mimetype,
      url: `/uploads/gallery/${invitationId}/${file?.originalname}`,
      note: 'MinIO integration pending - returning placeholder URL',
    };
  }

  @UseGuards(JwtAuthGuard, InvitationOwnerGuard)
  @Delete('gallery/:photoId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus foto dari galeri' })
  deleteGalleryPhoto(
    @Param('id') invitationId: string,
    @Param('photoId') photoId: string,
  ) {
    // TODO: Delete from MinIO
    return { message: `Photo ${photoId} deleted from gallery` };
  }
}
