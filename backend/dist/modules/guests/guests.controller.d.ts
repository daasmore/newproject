import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GuestQueryDto } from './dto/guest-query.dto';
import { SubmitRsvpDto } from './dto/submit-rsvp.dto';
export declare class RsvpController {
    private readonly guestsService;
    constructor(guestsService: GuestsService);
    findByToken(token: string): Promise<import("./entities/guest.entity").Guest>;
    submitRsvp(token: string, dto: SubmitRsvpDto): Promise<import("./entities/guest.entity").Guest>;
}
export declare class GuestsController {
    private readonly guestsService;
    constructor(guestsService: GuestsService);
    findAll(invitationId: string, query: GuestQueryDto): Promise<{
        data: import("./entities/guest.entity").Guest[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(invitationId: string, dto: CreateGuestDto): Promise<import("./entities/guest.entity").Guest>;
    remove(invitationId: string, guestId: string): Promise<{
        message: string;
    }>;
    getStats(invitationId: string): Promise<{
        total: number;
        attending: number;
        notAttending: number;
        pending: number;
        totalGuests: number;
    }>;
}
