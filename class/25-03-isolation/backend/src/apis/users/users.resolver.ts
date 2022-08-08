import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  // @UseGuards(AuthGuard('access')) // REST api 사용시에는 이렇게!
  // @Get('/boards')
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @Context() context: any, //
  ) {
    // 유저 정보 꺼내오기
    console.log(context.req.user);
    console.log('fetchUser 실행 완료!!');
    return 'fetchUser가 실행되었습니다!';
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age', { type: () => Int }) age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12.342);
    console.log(hashedPassword);

    return this.usersService.create({ email, hashedPassword, name, age });
  }
}
