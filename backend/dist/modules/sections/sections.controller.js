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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sections_service_1 = require("./sections.service");
const update_section_dto_1 = require("./dto/update-section.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const invitation_owner_guard_1 = require("../invitations/guards/invitation-owner.guard");
let SectionsController = class SectionsController {
    constructor(sectionsService) {
        this.sectionsService = sectionsService;
    }
    updateMempelai(invitationId, dto) {
        return this.sectionsService.updateOrCreate(invitationId, 'bride', dto);
    }
    updateAcara(invitationId, dto) {
        return this.sectionsService.updateOrCreate(invitationId, 'event', dto);
    }
    updateStory(invitationId, dto) {
        return this.sectionsService.updateOrCreate(invitationId, 'story', dto);
    }
    updateGifts(invitationId, dto) {
        return this.sectionsService.updateOrCreate(invitationId, 'gifts', dto);
    }
    updateRsvpSettings(invitationId, dto) {
        return this.sectionsService.updateOrCreate(invitationId, 'rsvp', dto);
    }
};
exports.SectionsController = SectionsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Put)('mempelai'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update info pengantin (bride & groom)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "updateMempelai", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Put)('acara'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update detail acara (akad, resepsi)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "updateAcara", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Put)('story'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update love story (array timeline)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "updateStory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Put)('gifts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update info hadiah (rekening, ewallet)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "updateGifts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, invitation_owner_guard_1.InvitationOwnerGuard),
    (0, common_1.Put)('rsvp-settings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update pengaturan RSVP' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "updateRsvpSettings", null);
exports.SectionsController = SectionsController = __decorate([
    (0, swagger_1.ApiTags)('Sections'),
    (0, common_1.Controller)('invitations/:id/sections'),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
//# sourceMappingURL=sections.controller.js.map