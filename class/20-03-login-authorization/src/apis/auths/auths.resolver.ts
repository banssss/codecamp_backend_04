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
  async userLogin(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인. (입력받은 email 계정정보 불러오기)
    const user = await this.usersService.findOne({ email });

    // 2. 결과값이 없을 시, 오류메시지 전송
    if (!user)
      throw new UnprocessableEntityException(
        '입력하신 계졍(이메일)의 가입내역이 없습니다.',
      );

    // 3. 입력받은 비밀번호가 계정의 비밀번호가 다를 때, 오류메시지 전송
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException(
        '비밀번호가 일치하지 않습니다. 로그인 할 수 없습니다.',
      );

    // 4. 입력받은 계정과 비밀번호가 일치할 때
    //    => accessToken( -> JWT ) 생성하여 브라우저에 전달하기.
    return this.authsService.getAccessToken({ user });
  }
}
