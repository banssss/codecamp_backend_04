import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: {
    email: string;
    hashedPassword: string;
    name: string;
    age: number;
  };
}

@Controller()
export class AuthsController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authsService: AuthsService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    let user = await this.usersService.findOne({ email: req.user.email });

    // 2. 회원가입
    if (!user) {
      user = await this.usersService.create({
        ...req.user,
        // email: req.user.email,
        // hashedPassword: req.user.hashedPassword,
        // name: req.user.name,
        // age: req.user.age,
      });
    }
    // 3. 로그인 (AccessToken 만들어서 프론트에 주기)
    this.authsService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/codecamp-backend-04/class/21-03-login-google/frontend/social-login.html',
    );
  }
}
