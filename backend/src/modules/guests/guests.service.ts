// @ts-nocheck
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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
      order: { createdAt: 'DESC' as any },
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
      totalGuests: guests
        .filter((g) => g.rsvpStatus === 'attending')
        .reduce((sum, g) => sum + (g.rsvpCount || 0), 0),
    };
  }

  async importFromCsv(invitationId: string, csvContent: string) {
    const lines = csvContent.trim().split('\n');
    const results = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const columns = line.split(',').map((c) => c.trim().replace(/"/g, ''));

      const name = columns[0];
      const phone = columns[1] || null;
      const groupName = columns[2] || null;

      if (!name) continue;

      const token = this.generateToken();

      const guest = this.guestRepository.create({
        invitationId,
        name,
        phone,
        groupName,
        token,
      });

      try {
        await this.guestRepository.save(guest);
        results.push({ success: true, name });
      } catch (err) {
        results.push({ success: false, name, error: 'Gagal import' });
      }
    }

    return {
      message: `Import selesai: ${results.filter((r) => r.success).length} berhasil, ${results.filter((r) => !r.success).length} gagal`,
      details: results,
    };
  }

  async exportToCsv(invitationId: string): Promise<string> {
    const guests = await this.guestRepository.find({
      where: { invitationId },
      order: { name: 'ASC' },
    });

    const header = 'Nama,Phone,Grup,Status RSVP,Jumlah,Tanggal RSVP,Pesan\n';
    const rows = guests
      .map((g) => {
        const cleanStr = (s: string) => (s || '').replace(/,/g, ';').replace(/\n/g, ' ');
        return `"${cleanStr(g.name)}","${cleanStr(g.phone)}","${cleanStr(g.groupName)}","${g.rsvpStatus}","${g.rsvpCount}","${g.rsvpAt || ''}","${cleanStr(g.rsvpMessage)}"`;
      })
      .join('\n');

    return header + rows;
  }

  async getFormLink(invitationId: string) {
    return {
      formLink: `/undangan/${invitationId}/daftar`,
      message: 'Share link ini ke tamu untuk registrasi mandiri',
    };
  }

  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
