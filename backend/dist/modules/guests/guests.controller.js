"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestsController = exports.RsvpController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guests_service_1 = require("./guests.service");
const create_guest_dto_1 = require("./dto/create-guest.dto");
const guest_query_dto_1 = require("./dto/guest-query.dto");
const submit_rsvp_dto_1 = require("./dto/submit-rsvp.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const invitation_owner_guard_1 = require("../invitations/guards/invitation-owner.guard");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let RsvpController = class RsvpController {
    constructor(guestsService) {
        this.guestsService = guestsService;
    }
    findByToken(token) {
        return this.guestsService.findByToken(token);
    }
    submitRsvp(token, dto) {
        return this.guestsService.submitRsvp(token, dto);
    }
};
exports.RsvpController = RsvpController;
__decorate([
    (0, common_1.Get)(':guestToken'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil data tamu berdasarkan token' }),
    __param(0, (0, common_1.Param)('guestToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RsvpController.prototype, "findByToken", null);
__decorate([
    (0, common_1.Post)(':guestToken'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit RSVP' }),
    __param(0, (0, common_1.Param)('guestToken')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_rsvp_dto_1.SubmitRsvpDto]),
    __metadata("design:returntype", void 0)
], RsvpController.prototype, "submitRsvp", null);
exports.RsvpController = RsvpController = __decorate([
    (0, swagger_1.ApiTags)('RSVP'),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('rsvp'),
    __metadata("design:paramtypes", [guests_service_1.GuestsService])
], RsvpController);
let GuestsController = class GuestsController {
    constructor(guestsService) {
        this.guestsService = guestsService;
    }
    findAll(invitationId, query) {
        return this.guestsService.findAllByInvitation(invitationId, query);
    }
    create(invitationId, dto) {
        return this.guestsService.addGuest(invitationId, dto);
    }
    remove(invitationId, guestId) {
        return this.guestsService.remove(guestId, invitationId);
    }
    getStats(invitationId) {
        return this.guestsService.getStats(invitationId);
    }
};
exports.GuestsController = GuestsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List tamu dengan pagination, filter, search' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, guest_query_dto_1.GuestQueryDto]),
    __metadata("design:returntype", void 0)
], GuestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah tamu manual' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_guest_dto_1.CreateGuestDto]),
    __metadata("design:returntype", void 0)
], GuestsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Delete)(':guestId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus tamu' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('guestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GuestsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Statistik tamu & RSVP' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuestsController.prototype, "getStats", null);
exports.GuestsController = GuestsController = __decorate([
    (0, swagger_1.ApiTags)('Guests'),
    (0, common_1.Controller)('invitations/:id/guests'),
    __metadata("design:paramtypes", [guests_service_1.GuestsService])
], GuestsController);
//# sourceMappingURL=guests.controller.js.map