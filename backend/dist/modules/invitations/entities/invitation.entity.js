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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const invitation_section_entity_1 = require("../../sections/entities/invitation-section.entity");
const guest_entity_1 = require("../../guests/entities/guest.entity");
const message_entity_1 = require("./message.entity");
let Invitation = class Invitation extends base_entity_1.BaseEntity {
};
exports.Invitation = Invitation;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Invitation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Invitation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Invitation.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Invitation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'template_id', nullable: true }),
    __metadata("design:type", String)
], Invitation.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'is_published' }),
    __metadata("design:type", Boolean)
], Invitation.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true, name: 'music_url' }),
    __metadata("design:type", String)
], Invitation.prototype, "musicUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], Invitation.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invitation_section_entity_1.InvitationSection, (section) => section.invitation),
    __metadata("design:type", Array)
], Invitation.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => guest_entity_1.Guest, (guest) => guest.invitation),
    __metadata("design:type", Array)
], Invitation.prototype, "guests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (msg) => msg.invitation),
    __metadata("design:type", Array)
], Invitation.prototype, "messages", void 0);
exports.Invitation = Invitation = __decorate([
    (0, typeorm_1.Entity)('invitations')
], Invitation);
//# sourceMappingURL=invitation.entity.js.map