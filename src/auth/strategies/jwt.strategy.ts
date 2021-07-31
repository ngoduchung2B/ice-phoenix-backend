import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.schema';
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
  }): Promise<User | null> {
    const data = await this.userService.getUserByUserName(
      validationPayload.user_name,
    );
    console.log('asd', validationPayload, data);
    return data;
  }
}
