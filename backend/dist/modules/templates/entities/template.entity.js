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
exports.Template = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
let Template = class Template extends base_entity_1.BaseEntity {
};
exports.Template = Template;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Template.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Template.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true, name: 'thumbnail_url' }),
    __metadata("design:type", String)
], Template.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true, name: 'preview_url' }),
    __metadata("design:type", String)
], Template.prototype, "previewUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['free', 'premium'], default: 'free' }),
    __metadata("design:type", String)
], Template.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Template.prototype, "isActive", void 0);
exports.Template = Template = __decorate([
    (0, typeorm_1.Entity)('templates')
], Template);
//# sourceMappingURL=template.entity.js.map