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
exports.SectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invitation_section_entity_1 = require("./entities/invitation-section.entity");
let SectionsService = class SectionsService {
    constructor(sectionRepository) {
        this.sectionRepository = sectionRepository;
    }
    async updateOrCreate(invitationId, type, dto) {
        let section = await this.sectionRepository.findOne({
            where: { invitationId, type: type },
        });
        if (section) {
            if (dto.content !== undefined)
                section.content = dto.content;
            if (dto.orderIndex !== undefined)
                section.orderIndex = dto.orderIndex;
            if (dto.isVisible !== undefined)
                section.isVisible = dto.isVisible;
        }
        else {
            section = this.sectionRepository.create({
                invitationId,
                type: type,
                content: dto.content || {},
                orderIndex: dto.orderIndex || 0,
                isVisible: dto.isVisible !== undefined ? dto.isVisible : true,
            });
        }
        await this.sectionRepository.save(section);
        return section;
    }
};
exports.SectionsService = SectionsService;
exports.SectionsService = SectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invitation_section_entity_1.InvitationSection)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SectionsService);
//# sourceMappingURL=sections.service.js.map