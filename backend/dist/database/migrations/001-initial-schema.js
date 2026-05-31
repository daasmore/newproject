"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema001 = void 0;
const typeorm_1 = require("typeorm");
class InitialSchema001 {
    constructor() {
        this.name = 'InitialSchema001';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'name', type: 'varchar', length: '255' },
                { name: 'email', type: 'varchar', length: '255', isUnique: true },
                { name: 'password_hash', type: 'varchar', length: '255' },
                { name: 'phone', type: 'varchar', length: '20', isNullable: true },
                { name: 'plan', type: 'enum', enum: ['free', 'basic', 'premium'], default: "'free'" },
                { name: 'subscription_expires_at', type: 'timestamp', isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'templates',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'name', type: 'varchar', length: '100' },
                { name: 'slug', type: 'varchar', length: '100', isUnique: true },
                { name: 'thumbnail_url', type: 'varchar', length: '500', isNullable: true },
                { name: 'preview_url', type: 'varchar', length: '500', isNullable: true },
                { name: 'tier', type: 'enum', enum: ['free', 'premium'], default: "'free'" },
                { name: 'is_active', type: 'boolean', default: true },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'invitations',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'user_id', type: 'uuid' },
                { name: 'slug', type: 'varchar', length: '100', isUnique: true },
                { name: 'title', type: 'varchar', length: '255', isNullable: true },
                { name: 'template_id', type: 'uuid', isNullable: true },
                { name: 'is_published', type: 'boolean', default: false },
                { name: 'music_url', type: 'varchar', length: '500', isNullable: true },
                { name: 'settings', type: 'jsonb', default: "'{}'" },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
            foreignKeys: [
                { columnNames: ['user_id'], referencedTableName: 'users', referencedColumnNames: ['id'], onDelete: 'CASCADE' },
                { columnNames: ['template_id'], referencedTableName: 'templates', referencedColumnNames: ['id'], onDelete: 'SET NULL' },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'invitation_sections',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'invitation_id', type: 'uuid' },
                { name: 'type', type: 'enum', enum: ['bride', 'groom', 'event', 'story', 'gallery', 'gifts', 'rsvp'] },
                { name: 'content', type: 'jsonb', default: "'{}'" },
                { name: 'order_index', type: 'int', default: 0 },
                { name: 'is_visible', type: 'boolean', default: true },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
            foreignKeys: [
                { columnNames: ['invitation_id'], referencedTableName: 'invitations', referencedColumnNames: ['id'], onDelete: 'CASCADE' },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'guests',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'invitation_id', type: 'uuid' },
                { name: 'name', type: 'varchar', length: '255' },
                { name: 'phone', type: 'varchar', length: '20', isNullable: true },
                { name: 'group_name', type: 'varchar', length: '100', isNullable: true },
                { name: 'token', type: 'varchar', length: '64', isUnique: true },
                { name: 'rsvp_status', type: 'enum', enum: ['pending', 'attending', 'not_attending'], default: "'pending'" },
                { name: 'rsvp_count', type: 'int', default: 1 },
                { name: 'rsvp_message', type: 'text', isNullable: true },
                { name: 'rsvp_at', type: 'timestamp', isNullable: true },
                { name: 'reminder_sent_at', type: 'timestamp', isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
            foreignKeys: [
                { columnNames: ['invitation_id'], referencedTableName: 'invitations', referencedColumnNames: ['id'], onDelete: 'CASCADE' },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'messages',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'invitation_id', type: 'uuid' },
                { name: 'guest_name', type: 'varchar', length: '255' },
                { name: 'content', type: 'text' },
                { name: 'status', type: 'enum', enum: ['pending', 'approved', 'rejected'], default: "'pending'" },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
            foreignKeys: [
                { columnNames: ['invitation_id'], referencedTableName: 'invitations', referencedColumnNames: ['id'], onDelete: 'CASCADE' },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'packages',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'name', type: 'varchar', length: '100' },
                { name: 'price', type: 'int' },
                { name: 'features', type: 'jsonb', default: "'[]'" },
                { name: 'max_guests', type: 'int', default: 100 },
                { name: 'duration_days', type: 'int', default: 365 },
                { name: 'is_active', type: 'boolean', default: true },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'orders',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'gen_random_uuid()' },
                { name: 'user_id', type: 'uuid', isNullable: true },
                { name: 'package_id', type: 'uuid', isNullable: true },
                { name: 'amount', type: 'int' },
                { name: 'status', type: 'enum', enum: ['pending', 'paid', 'expired', 'cancelled'], default: "'pending'" },
                { name: 'payment_gateway', type: 'varchar', length: '50', isNullable: true },
                { name: 'gateway_order_id', type: 'varchar', length: '255', isNullable: true },
                { name: 'paid_at', type: 'timestamp', isNullable: true },
                { name: 'expires_at', type: 'timestamp', isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'NOW()' },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
            ],
            foreignKeys: [
                { columnNames: ['user_id'], referencedTableName: 'users', referencedColumnNames: ['id'], onDelete: 'SET NULL' },
                { columnNames: ['package_id'], referencedTableName: 'packages', referencedColumnNames: ['id'], onDelete: 'SET NULL' },
            ],
        }), true);
        await queryRunner.createIndex('invitations', new typeorm_1.TableIndex({ columnNames: ['user_id'] }));
        await queryRunner.createIndex('invitation_sections', new typeorm_1.TableIndex({ columnNames: ['invitation_id', 'type'], isUnique: true }));
        await queryRunner.createIndex('guests', new typeorm_1.TableIndex({ columnNames: ['invitation_id'] }));
        await queryRunner.createIndex('messages', new typeorm_1.TableIndex({ columnNames: ['invitation_id', 'status'] }));
        await queryRunner.createIndex('orders', new typeorm_1.TableIndex({ columnNames: ['user_id', 'status'] }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('orders', true);
        await queryRunner.dropTable('packages', true);
        await queryRunner.dropTable('messages', true);
        await queryRunner.dropTable('guests', true);
        await queryRunner.dropTable('invitation_sections', true);
        await queryRunner.dropTable('invitations', true);
        await queryRunner.dropTable('templates', true);
        await queryRunner.dropTable('users', true);
    }
}
exports.InitialSchema001 = InitialSchema001;
//# sourceMappingURL=001-initial-schema.js.map