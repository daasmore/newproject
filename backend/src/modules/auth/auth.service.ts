// @ts-nocheck
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
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

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const isPasswordValid = await user.validatePassword(dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const tokens = await this.generateTokens(user);

    return {
      user,
      ...tokens,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret') || 'default-refresh-secret',
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub } as any,
      });

      if (!user) {
        throw new UnauthorizedException('User tidak ditemukan');
      }

      const tokens = await this.generateTokens(user);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Refresh token tidak valid');
    }
  }

  async logout(userId: string) {
    return { message: 'Logout berhasil' };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId } as any,
    });

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    return user;
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtExpiration = this.configService.get<string>('jwt.expiration') || '15m';
    const jwtRefreshSecret = this.configService.get<string>('jwt.refreshSecret') || 'default-refresh-secret';
    const jwtRefreshExpiration = this.configService.get<string>('jwt.refreshExpiration') || '7d';

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: jwtExpiration as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtRefreshSecret,
      expiresIn: jwtRefreshExpiration as any,
    });

    return { accessToken, refreshToken };
  }
}
