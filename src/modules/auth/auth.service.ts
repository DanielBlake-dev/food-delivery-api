import { CreateUserDTO } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async validate(username: string, pswd: string) {
    const user = await this.usersService.getUser(username);

    if (!user) {
      throw new UnauthorizedException('Username or password is invalid');
    }

    const { password, ...userWithoutPassword } = user;

    if (!compareSync(pswd, password)) {
      throw new UnauthorizedException('Username or password is invalid');
    }
    return userWithoutPassword;
  }

  public async create(user: CreateUserDTO) {
    await this.usersService.create(user);
    return {
      message: 'User createad successfully!',
    };
  }
}
