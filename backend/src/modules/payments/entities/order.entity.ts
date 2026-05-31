// @ts-nocheck
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../auth/entities/user.entity';
import { Package } from './package.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => Package, { nullable: true })
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @Column({ name: 'package_id', nullable: true })
  packageId: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'paid', 'expired', 'cancelled'],
    default: 'pending',
  })
  status: 'pending' | 'paid' | 'expired' | 'cancelled';

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'payment_gateway' })
  paymentGateway: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'gateway_order_id' })
  gatewayOrderId: string;

  @Column({ type: 'timestamp', nullable: true, name: 'paid_at' })
  paidAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'expires_at' })
  expiresAt: Date;
}
