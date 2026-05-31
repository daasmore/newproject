import { BaseEntity } from '../../common/entities/base.entity';
export declare class Template extends BaseEntity {
    name: string;
    slug: string;
    thumbnailUrl: string;
    previewUrl: string;
    tier: 'free' | 'premium';
    isActive: boolean;
}
