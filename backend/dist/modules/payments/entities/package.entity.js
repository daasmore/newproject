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
exports.Package = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
let Package = class Package extends base_entity_1.BaseEntity {
};
exports.Package = Package;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Package.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Package.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Package.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 100, name: 'max_guests' }),
    __metadata("design:type", Number)
], Package.prototype, "maxGuests", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 365, name: 'duration_days' }),
    __metadata("design:type", Number)
], Package.prototype, "durationDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Package.prototype, "isActive", void 0);
exports.Package = Package = __decorate([
    (0, typeorm_1.Entity)('packages')
], Package);
//# sourceMappingURL=package.entity.js.map