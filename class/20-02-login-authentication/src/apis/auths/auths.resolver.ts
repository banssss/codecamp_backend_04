import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthsService } from './auths.service';
import { UsersService } from '../users/users.service';
import { UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authsService: AuthsService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인(이메일이 일치하는 유저를 DB에서 찾기)
    const user = await this.usersService.findOne({ email });

    // 2. 일치하는 유저가 없으면? 에러 던지기!!!
    if (!user)
      throw new UnprocessableEntityException(
        '입력하신 이메일의 가입내역이 없습니다.',
      );

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    // 4. 일치하는 유저도 있고, 비밀번호도 일치한다면??
    //    => accessToken(->JWT) 생성하여 브라우저에 전달하기.
    return this.authsService.getAccessToken({ user });
  }
}
