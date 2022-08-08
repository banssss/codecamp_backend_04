import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  // Refresh Token 생성 -> response header에 넣어주는 과정.
  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);

    // 배포환경
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`);
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
  }

  // Access Token 생성 - secret과 expire주기 설정
  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      // { secret: 'myAccessKey', expiresIn: '1h' },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
