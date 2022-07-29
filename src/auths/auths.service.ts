import { ConfigService } from '@nestjs/config';
import { UsersService } from './../users/users.service';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.create(createAuthDto);
    return user;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.validateUser(loginAuthDto.login);
    await this.verifyPassword(loginAuthDto.password, user.password);
    return await this.getTokens(user.id, loginAuthDto.login);
  }

  async getTokens(id: string, login: string) {
    const accessToken = this.getAccessToken(id, login);
    const refreshToken = this.getRefreshToken(id, login);
    await this.usersService.setRefreshToken(id, refreshToken.refresToken);

    return {
      ...accessToken,
      ...refreshToken,
    };
  }

  async refresh(id: string, login: string) {
    return await this.getTokens(id, login);
  }

  getAccessToken(userId: string, login: string) {
    const payload = { userId, login };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return {
      accessToken: token,
    };
  }

  getRefreshToken(userId: string, login: string) {
    const payload = { userId, login };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return {
      refresToken: token,
    };
  }

  async verifyPassword(loginPass: string, userPass: string) {
    const match = await bcrypt.compare(loginPass, userPass);
    if (!match) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'Wrong credentials',
      });
    }
  }

  async validateUser(login: string) {
    return await this.usersService.findByLogin(login);
  }
}
