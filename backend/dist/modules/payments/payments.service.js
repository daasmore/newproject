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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const package_entity_1 = require("./entities/package.entity");
const order_entity_1 = require("./entities/order.entity");
let PaymentsService = class PaymentsService {
    constructor(packageRepository, orderRepository) {
        this.packageRepository = packageRepository;
        this.orderRepository = orderRepository;
    }
    async getPackages() {
        return this.packageRepository.find({
            where: { isActive: true },
            order: { price: 'ASC' },
        });
    }
    async createOrder(userId, packageId) {
        const pkg = await this.packageRepository.findOne({
            where: { id: packageId, isActive: true },
        });
        if (!pkg) {
            throw new common_1.NotFoundException('Paket tidak ditemukan');
        }
        const order = this.orderRepository.create({
            userId,
            packageId,
            amount: pkg.price,
            status: 'pending',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        await this.orderRepository.save(order);
        return order;
    }
    async getOrders(userId) {
        return this.orderRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(package_entity_1.Package)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map