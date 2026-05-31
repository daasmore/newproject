// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getPackages() {
    return this.packageRepository.find({
      where: { isActive: true },
      order: { price: 'ASC' },
    });
  }

  async createOrder(userId: string, packageId: string) {
    const pkg = await this.packageRepository.findOne({
      where: { id: packageId, isActive: true },
    });

    if (!pkg) {
      throw new NotFoundException('Paket tidak ditemukan');
    }

    const order = this.orderRepository.create({
      userId,
      packageId,
      amount: pkg.price,
      status: 'pending',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h expiry
    });

    await this.orderRepository.save(order);
    return order;
  }

  async getOrders(userId: string) {
    return this.orderRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
