import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestQueryDto } from './dto/guest-query.dto';
import { SubmitRsvpDto } from './dto/submit-rsvp.dto';
export declare class GuestsService {
    private guestRepository;
    constructor(guestRepository: Repository<Guest>);
    findAllByInvitation(invitationId: string, query: GuestQueryDto): Promise<{
        data: Guest[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    addGuest(invitationId: string, dto: CreateGuestDto): Promise<Guest>;
    findByToken(token: string): Promise<Guest>;
    submitRsvp(token: string, dto: SubmitRsvpDto): Promise<Guest>;
    remove(guestId: string, invitationId: string): Promise<{
        message: string;
    }>;
    getStats(invitationId: string): Promise<{
        total: number;
        attending: number;
        notAttending: number;
        pending: number;
        totalGuests: number;
    }>;
    private generateToken;
}
