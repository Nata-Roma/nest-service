import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

const bodyExtractor = (req: Request, jwtService: JwtService): string => {
  if (
    !req.body ||
    !req.body['refreshToken'] ||
    typeof req.body['refreshToken'] !== 'string'
  ) {
    throw new UnauthorizedException({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Invalid refresh token body',
    });
  }

  const token = jwtService.decode(req.body['refreshToken']);
  if (Date.now() >= token['exp'] * 1000) {
    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      message: 'Refresh token expired',
    });
  }

  return req.body['refreshToken'];
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private userService: UsersService,
    config: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: (req: Request) => bodyExtractor(req, jwtService),
      secretOrKey: config.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { userId: string; login: string }) {
    return await this.userService.findOne(payload.userId);
  }
}
