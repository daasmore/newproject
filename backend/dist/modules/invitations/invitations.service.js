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
exports.InvitationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invitation_entity_1 = require("./entities/invitation.entity");
let InvitationsService = class InvitationsService {
    constructor(invitationRepository) {
        this.invitationRepository = invitationRepository;
    }
    async create(userId, dto) {
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
    async findAll(userId) {
        return this.invitationRepository.find({
            where: { userId },
            order: { updatedAt: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const invitation = await this.invitationRepository.findOne({
            where: { id, userId },
            relations: ['sections', 'guests', 'messages'],
        });
        if (!invitation) {
            throw new common_1.NotFoundException('Undangan tidak ditemukan');
        }
        return invitation;
    }
    async findBySlug(slug) {
        const invitation = await this.invitationRepository.findOne({
            where: { slug, isPublished: true },
            relations: ['sections', 'guests', 'messages'],
        });
        if (!invitation) {
            throw new common_1.NotFoundException('Undangan tidak ditemukan atau belum dipublikasikan');
        }
        return invitation;
    }
    async update(id, userId, dto) {
        const invitation = await this.findOne(id, userId);
        if (dto.title !== undefined)
            invitation.title = dto.title;
        if (dto.templateId !== undefined)
            invitation.templateId = dto.templateId;
        if (dto.musicUrl !== undefined)
            invitation.musicUrl = dto.musicUrl;
        if (dto.settings !== undefined)
            invitation.settings = dto.settings;
        await this.invitationRepository.save(invitation);
        return invitation;
    }
    async togglePublish(id, userId) {
        const invitation = await this.findOne(id, userId);
        invitation.isPublished = !invitation.isPublished;
        await this.invitationRepository.save(invitation);
        return invitation;
    }
    async remove(id, userId) {
        const invitation = await this.findOne(id, userId);
        await this.invitationRepository.remove(invitation);
        return { message: 'Undangan berhasil dihapus' };
    }
    async generateSlug(title) {
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
};
exports.InvitationsService = InvitationsService;
exports.InvitationsService = InvitationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invitation_entity_1.Invitation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvitationsService);
//# sourceMappingURL=invitations.service.js.map