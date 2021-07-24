import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(
    user_name: string,
    password: string,
  ): Promise<UserType | null> {
    const user = await this.userService.getUserByUserName(user_name);

    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: UserType): { access_token: string } {
    const payload = {
      user_name: user.user_name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<UserType> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = await this.userService.getUserByUserName(decoded.user_name);

    if (!user) {
      throw new Error('unable to get the user from decoded token!');
    }

    return user;
  }
}
