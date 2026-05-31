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
exports.InvitationSection = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const invitation_entity_1 = require("../../invitations/entities/invitation.entity");
let InvitationSection = class InvitationSection extends base_entity_1.BaseEntity {
};
exports.InvitationSection = InvitationSection;
__decorate([
    (0, typeorm_1.ManyToOne)(() => invitation_entity_1.Invitation, (inv) => inv.sections, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invitation_id' }),
    __metadata("design:type", invitation_entity_1.Invitation)
], InvitationSection.prototype, "invitation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invitation_id' }),
    __metadata("design:type", String)
], InvitationSection.prototype, "invitationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['bride', 'groom', 'event', 'story', 'gallery', 'gifts', 'rsvp'],
    }),
    __metadata("design:type", String)
], InvitationSection.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], InvitationSection.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, name: 'order_index' }),
    __metadata("design:type", Number)
], InvitationSection.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_visible' }),
    __metadata("design:type", Boolean)
], InvitationSection.prototype, "isVisible", void 0);
exports.InvitationSection = InvitationSection = __decorate([
    (0, typeorm_1.Entity)('invitation_sections')
], InvitationSection);
//# sourceMappingURL=invitation-section.entity.js.map