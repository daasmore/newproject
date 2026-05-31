"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = runSeed;
const template_entity_1 = require("../../modules/templates/entities/template.entity");
const package_entity_1 = require("../../modules/payments/entities/package.entity");
async function runSeed(dataSource) {
    const templateRepo = dataSource.getRepository(template_entity_1.Template);
    const packageRepo = dataSource.getRepository(package_entity_1.Package);
    const templates = [
        {
            name: 'Classic Elegance',
            slug: 'classic-elegance',
            thumbnailUrl: '/templates/classic-elegance/thumb.jpg',
            previewUrl: '/templates/classic-elegance/preview.jpg',
            tier: 'free',
        },
        {
            name: 'Modern Minimalist',
            slug: 'modern-minimalist',
            thumbnailUrl: '/templates/modern-minimalist/thumb.jpg',
            previewUrl: '/templates/modern-minimalist/preview.jpg',
            tier: 'free',
        },
        {
            name: 'Rustic Garden',
            slug: 'rustic-garden',
            thumbnailUrl: '/templates/rustic-garden/thumb.jpg',
            previewUrl: '/templates/rustic-garden/preview.jpg',
            tier: 'premium',
        },
        {
            name: 'Floral Romance',
            slug: 'floral-romance',
            thumbnailUrl: '/templates/floral-romance/thumb.jpg',
            previewUrl: '/templates/floral-romance/preview.jpg',
            tier: 'premium',
        },
        {
            name: 'Golden Luxury',
            slug: 'golden-luxury',
            thumbnailUrl: '/templates/golden-luxury/thumb.jpg',
            previewUrl: '/templates/golden-luxury/preview.jpg',
            tier: 'premium',
        },
    ];
    for (const t of templates) {
        const existing = await templateRepo.findOne({ where: { slug: t.slug } });
        if (!existing) {
            await templateRepo.save(templateRepo.create(t));
        }
    }
    console.log('✅ Templates seeded');
    const packages = [
        {
            name: 'Gratis',
            price: 0,
            features: [
                '1 undangan aktif',
                '3 template gratis',
                'RSVP dasar',
                'Maksimal 50 tamu',
                'Dashboard sederhana',
            ],
            maxGuests: 50,
            durationDays: 365,
        },
        {
            name: 'Basic',
            price: 99000,
            features: [
                '3 undangan aktif',
                'Semua template gratis',
                'RSVP lengkap',
                'Maksimal 200 tamu',
                'Import tamu CSV',
                'Dashboard lengkap',
            ],
            maxGuests: 200,
            durationDays: 365,
        },
        {
            name: 'Premium',
            price: 249000,
            features: [
                'Undangan tak terbatas',
                'Semua template (free + premium)',
                'RSVP+ (custom question)',
                'Tamu tak terbatas',
                'WhatsApp blast',
                'Reminder otomatis',
                'Custom domain',
                'Priority support',
            ],
            maxGuests: 999999,
            durationDays: 365,
        },
    ];
    for (const p of packages) {
        const existing = await packageRepo.findOne({ where: { name: p.name } });
        if (!existing) {
            await packageRepo.save(packageRepo.create(p));
        }
    }
    console.log('✅ Packages seeded');
    console.log('🎉 Seed completed successfully');
}
//# sourceMappingURL=initial-seed.js.map