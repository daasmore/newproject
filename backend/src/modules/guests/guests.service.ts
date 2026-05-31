// @ts-nocheck
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import * as crypto from 'crypto';
import { Guest } from './entities/guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestQueryDto } from './dto/guest-query.dto';
import { SubmitRsvpDto } from './dto/submit-rsvp.dto';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
  ) {}

  async findAllByInvitation(invitationId: string, query: GuestQueryDto) {
    const { page = 1, limit = 20, group, rsvpStatus, search } = query;
    const skip = (page - 1) * limit;

    const where: any = { invitationId };

    if (group) {
      where.groupName = group;
    }

    if (rsvpStatus) {
      where.rsvpStatus = rsvpStatus;
    }

    if (search) {
      where.name = Like(`%${search}%`);
    }

    const [data, total] = await this.guestRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async addGuest(invitationId: string, dto: CreateGuestDto) {
    const token = this.generateToken();

    const guest = this.guestRepository.create({
      invitationId,
      name: dto.name,
      phone: dto.phone,
      groupName: dto.groupName,
      token,
    });

    await this.guestRepository.save(guest);
    return guest;
  }

  async findByToken(token: string) {
    const guest = await this.guestRepository.findOne({
      where: { token },
    });

    if (!guest) {
      throw new NotFoundException('Tamu tidak ditemukan');
    }

    return guest;
  }

  async submitRsvp(token: string, dto: SubmitRsvpDto) {
    const guest = await this.findByToken(token);

    if (guest.rsvpStatus !== 'pending') {
      throw new ConflictException('RSVP sudah pernah disubmit');
    }

    guest.rsvpStatus = dto.status;
    guest.rsvpCount = dto.count || 1;
    guest.rsvpMessage = dto.message || null;
    guest.rsvpAt = new Date();

    await this.guestRepository.save(guest);
    return guest;
  }

  async remove(guestId: string, invitationId: string) {
    const guest = await this.guestRepository.findOne({
      where: { id: guestId, invitationId },
    });

    if (!guest) {
      throw new NotFoundException('Tamu tidak ditemukan');
    }

    await this.guestRepository.remove(guest);
    return { message: 'Tamu berhasil dihapus' };
  }

  async getStats(invitationId: string) {
    const guests = await this.guestRepository.find({
      where: { invitationId },
    });

    return {
      total: guests.length,
      attending: guests.filter((g) => g.rsvpStatus === 'attending').length,
      notAttending: guests.filter((g) => g.rsvpStatus === 'not_attending').length,
      pending: guests.filter((g) => g.rsvpStatus === 'pending').length,
      totalGuests: guests.reduce((sum, g) => sum + (g.rsvpCount || 0), 0),
    };
  }

  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
