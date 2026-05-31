import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../auth/entities/user.entity';
import { Package } from './package.entity';
export declare class Order extends BaseEntity {
    user: User;
    userId: string;
    package: Package;
    packageId: string;
    amount: number;
    status: 'pending' | 'paid' | 'expired' | 'cancelled';
    paymentGateway: string;
    gatewayOrderId: string;
    paidAt: Date;
    expiresAt: Date;
}
