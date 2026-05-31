// @ts-nocheck
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  async create(userId: string, dto: CreateInvitationDto) {
    const slug = await this.generateSlug(dto.title || 'undangan');

    const invitation = this.invitationRepository.create({
      userId,
      title: dto.title,
      templateId: dto.templateId,
      slug,
    });

    await this.invitationRepository.save(invitation);
    return invitation;
  }

  async findAll(userId: string) {
    return this.invitationRepository.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const invitation = await this.invitationRepository.findOne({
      where: { id, userId },
      relations: ['sections', 'guests', 'messages'],
    });

    if (!invitation) {
      throw new NotFoundException('Undangan tidak ditemukan');
    }

    return invitation;
  }

  async findBySlug(slug: string) {
    const invitation = await this.invitationRepository.findOne({
      where: { slug, isPublished: true },
      relations: ['sections', 'guests', 'messages'],
    });

    if (!invitation) {
      throw new NotFoundException('Undangan tidak ditemukan atau belum dipublikasikan');
    }

    return invitation;
  }

  async update(id: string, userId: string, dto: UpdateInvitationDto) {
    const invitation = await this.findOne(id, userId);

    if (dto.title !== undefined) invitation.title = dto.title;
    if (dto.templateId !== undefined) invitation.templateId = dto.templateId;
    if (dto.musicUrl !== undefined) invitation.musicUrl = dto.musicUrl;
    if (dto.settings !== undefined) invitation.settings = dto.settings;

    await this.invitationRepository.save(invitation);
    return invitation;
  }

  async togglePublish(id: string, userId: string) {
    const invitation = await this.findOne(id, userId);
    invitation.isPublished = !invitation.isPublished;
    await this.invitationRepository.save(invitation);
    return invitation;
  }

  async remove(id: string, userId: string) {
    const invitation = await this.findOne(id, userId);
    await this.invitationRepository.remove(invitation);
    return { message: 'Undangan berhasil dihapus' };
  }

  private async generateSlug(title: string): Promise<string> {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);

    let slug = baseSlug;
    let counter = 1;

    while (await this.invitationRepository.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}
