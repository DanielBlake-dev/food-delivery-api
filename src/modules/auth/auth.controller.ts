import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';

import { LoginGuard } from './guards/login.guard';
import { AuthenticatedGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './../users/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/logout')
  public logout(@Request() req) {
    return req.logout();
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  public login(@Request() req) {
    return {
      message: 'Logined',
    };
  }

  @Post('/registration')
  public registration(@Body() user: CreateUserDTO) {
    return this.authService.create(user);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/me')
  public getMe(@Request() req) {
    return req.user;
  }
}
