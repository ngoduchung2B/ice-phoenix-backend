import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserType } from 'src/user/dto/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ username: 'user_name' });
  }

  async validate(user_name: string, password: string): Promise<UserType> {
    const user = await this.authService.validate(user_name, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
