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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const package_entity_1 = require("./package.entity");
let Order = class Order extends base_entity_1.BaseEntity {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => package_entity_1.Package, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'package_id' }),
    __metadata("design:type", package_entity_1.Package)
], Order.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'package_id', nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Order.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'paid', 'expired', 'cancelled'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, name: 'payment_gateway' }),
    __metadata("design:type", String)
], Order.prototype, "paymentGateway", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'gateway_order_id' }),
    __metadata("design:type", String)
], Order.prototype, "gatewayOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'paid_at' }),
    __metadata("design:type", Date)
], Order.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'expires_at' }),
    __metadata("design:type", Date)
], Order.prototype, "expiresAt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders')
], Order);
//# sourceMappingURL=order.entity.js.map