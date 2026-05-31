import { BaseEntity } from '../../common/entities/base.entity';
export declare class User extends BaseEntity {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    plan: 'free' | 'basic' | 'premium';
    subscriptionExpiresAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    toJSON(): any;
}
