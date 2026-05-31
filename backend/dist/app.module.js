"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const configuration_1 = __importDefault(require("./config/configuration"));
const auth_module_1 = require("./modules/auth/auth.module");
const invitations_module_1 = require("./modules/invitations/invitations.module");
const sections_module_1 = require("./modules/sections/sections.module");
const guests_module_1 = require("./modules/guests/guests.module");
const templates_module_1 = require("./modules/templates/templates.module");
const payments_module_1 = require("./modules/payments/payments.module");
const user_entity_1 = require("./modules/auth/entities/user.entity");
const invitation_entity_1 = require("./modules/invitations/entities/invitation.entity");
const invitation_section_entity_1 = require("./modules/sections/entities/invitation-section.entity");
const guest_entity_1 = require("./modules/guests/entities/guest.entity");
const template_entity_1 = require("./modules/templates/entities/template.entity");
const package_entity_1 = require("./modules/payments/entities/package.entity");
const order_entity_1 = require("./modules/payments/entities/order.entity");
const message_entity_1 = require("./modules/invitations/entities/message.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 900000,
                    limit: 100,
                },
            ]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.user'),
                    password: configService.get('database.password'),
                    database: configService.get('database.name'),
                    entities: [
                        user_entity_1.User,
                        invitation_entity_1.Invitation,
                        invitation_section_entity_1.InvitationSection,
                        guest_entity_1.Guest,
                        template_entity_1.Template,
                        package_entity_1.Package,
                        order_entity_1.Order,
                        message_entity_1.Message,
                    ],
                    synchronize: configService.get('nodeEnv') === 'development',
                    logging: configService.get('nodeEnv') === 'development',
                }),
            }),
            auth_module_1.AuthModule,
            invitations_module_1.InvitationsModule,
            sections_module_1.SectionsModule,
            guests_module_1.GuestsModule,
            templates_module_1.TemplatesModule,
            payments_module_1.PaymentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map