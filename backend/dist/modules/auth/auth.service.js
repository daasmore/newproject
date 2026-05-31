"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email sudah terdaftar');
        }
        const user = this.userRepository.create({
            name: dto.name,
            email: dto.email,
            passwordHash: dto.password,
            phone: dto.phone,
        });
        await this.userRepository.save(user);
        const tokens = await this.generateTokens(user);
        return {
            user,
            ...tokens,
        };
    }
    async login(dto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email atau password salah');
        }
        const isPasswordValid = await user.validatePassword(dto.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email atau password salah');
        }
        const tokens = await this.generateTokens(user);
        return {
            user,
            ...tokens,
        };
    }
    async refreshToken(dto) {
        try {
            const payload = this.jwtService.verify(dto.refreshToken, {
                secret: this.configService.get('jwt.refreshSecret') || 'default-refresh-secret',
            });
            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User tidak ditemukan');
            }
            const tokens = await this.generateTokens(user);
            return tokens;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token tidak valid');
        }
    }
    async logout(userId) {
        return { message: 'Logout berhasil' };
    }
    async getMe(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User tidak ditemukan');
        }
        return user;
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        const jwtExpiration = this.configService.get('jwt.expiration') || '15m';
        const jwtRefreshSecret = this.configService.get('jwt.refreshSecret') || 'default-refresh-secret';
        const jwtRefreshExpiration = this.configService.get('jwt.refreshExpiration') || '7d';
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: jwtExpiration,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: jwtRefreshSecret,
            expiresIn: jwtRefreshExpiration,
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map