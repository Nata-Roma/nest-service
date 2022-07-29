import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthsService } from './auths.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthsService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  //async validate(payload: { login: string }) {
    async validate(payload: {login: string}) {
    const user = await this.auth.validateUser(payload.login);
    
    return user;
  }
}
