// @ts-nocheck
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash', select: false })
  passwordHash: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: ['free', 'basic', 'premium'], default: 'free' })
  plan: 'free' | 'basic' | 'premium';

  @Column({ type: 'timestamp', name: 'subscription_expires_at', nullable: true })
  subscriptionExpiresAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.passwordHash && !this.passwordHash.startsWith('$2b$')) {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }

  toJSON() {
    const { passwordHash, ...rest } = this as any;
    return rest;
  }
}
