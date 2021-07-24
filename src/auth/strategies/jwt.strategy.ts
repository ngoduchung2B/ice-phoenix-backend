import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserType } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { jwtSecret } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(validationPayload: {
    user_name: string;
    sub: string;
  }): Promise<UserType | null> {
    return this.userService.getUserByUserName(validationPayload.user_name);
  }
}
