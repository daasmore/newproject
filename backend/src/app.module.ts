// @ts-nocheck
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { InvitationsModule } from './modules/invitations/invitations.module';
import { SectionsModule } from './modules/sections/sections.module';
import { GuestsModule } from './modules/guests/guests.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { User } from './modules/auth/entities/user.entity';
import { Invitation } from './modules/invitations/entities/invitation.entity';
import { InvitationSection } from './modules/sections/entities/invitation-section.entity';
import { Guest } from './modules/guests/entities/guest.entity';
import { Template } from './modules/templates/entities/template.entity';
import { Package } from './modules/payments/entities/package.entity';
import { Order } from './modules/payments/entities/order.entity';
import { Message } from './modules/invitations/entities/message.entity';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 900000, // 15 minutes
        limit: 100,
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
          User,
          Invitation,
          InvitationSection,
          Guest,
          Template,
          Package,
          Order,
          Message,
        ],
        synchronize: configService.get<string>('nodeEnv') === 'development',
        logging: configService.get<string>('nodeEnv') === 'development',
      }),
    }),
    AuthModule,
    InvitationsModule,
    SectionsModule,
    GuestsModule,
    TemplatesModule,
    PaymentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
