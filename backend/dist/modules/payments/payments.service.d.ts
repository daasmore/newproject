import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { Order } from './entities/order.entity';
export declare class PaymentsService {
    private packageRepository;
    private orderRepository;
    constructor(packageRepository: Repository<Package>, orderRepository: Repository<Order>);
    getPackages(): Promise<Package[]>;
    createOrder(userId: string, packageId: string): Promise<Order>;
    getOrders(userId: string): Promise<Order[]>;
}
