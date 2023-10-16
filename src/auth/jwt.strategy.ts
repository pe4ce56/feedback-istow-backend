import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import constant from 'src/config/constant';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constant.SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    if (payload.exp < new Date('').getTime() / 1000)
      throw new UnauthorizedException();
    return { userId: payload.sub, username: payload.username };
  }
}
