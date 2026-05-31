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
exports.GuestQueryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class GuestQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.GuestQueryDto = GuestQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Halaman', default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GuestQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Item per halaman', default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GuestQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by group' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GuestQueryDto.prototype, "group", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['pending', 'attending', 'not_attending'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['pending', 'attending', 'not_attending']),
    __metadata("design:type", String)
], GuestQueryDto.prototype, "rsvpStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GuestQueryDto.prototype, "search", void 0);
//# sourceMappingURL=guest-query.dto.js.map