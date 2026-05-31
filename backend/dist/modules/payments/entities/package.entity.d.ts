import { BaseEntity } from '../../common/entities/base.entity';
export declare class Package extends BaseEntity {
    name: string;
    price: number;
    features: string[];
    maxGuests: number;
    durationDays: number;
    isActive: boolean;
}
