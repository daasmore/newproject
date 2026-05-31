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
exports.Guest = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const invitation_entity_1 = require("../../invitations/entities/invitation.entity");
let Guest = class Guest extends base_entity_1.BaseEntity {
};
exports.Guest = Guest;
__decorate([
    (0, typeorm_1.ManyToOne)(() => invitation_entity_1.Invitation, (inv) => inv.guests, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invitation_id' }),
    __metadata("design:type", invitation_entity_1.Invitation)
], Guest.prototype, "invitation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invitation_id' }),
    __metadata("design:type", String)
], Guest.prototype, "invitationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Guest.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Guest.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, name: 'group_name' }),
    __metadata("design:type", String)
], Guest.prototype, "groupName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64, unique: true }),
    __metadata("design:type", String)
], Guest.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'attending', 'not_attending'],
        default: 'pending',
        name: 'rsvp_status',
    }),
    __metadata("design:type", String)
], Guest.prototype, "rsvpStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1, name: 'rsvp_count' }),
    __metadata("design:type", Number)
], Guest.prototype, "rsvpCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'rsvp_message' }),
    __metadata("design:type", String)
], Guest.prototype, "rsvpMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'rsvp_at' }),
    __metadata("design:type", Date)
], Guest.prototype, "rsvpAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'reminder_sent_at' }),
    __metadata("design:type", Date)
], Guest.prototype, "reminderSentAt", void 0);
exports.Guest = Guest = __decorate([
    (0, typeorm_1.Entity)('guests')
], Guest);
//# sourceMappingURL=guest.entity.js.map