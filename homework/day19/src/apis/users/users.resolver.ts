import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  // 모든 사용자 출력
  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  // Id값이 일치하는 사용자 출력
  @Query(() => User)
  fetchUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.findOne({ userId });
  }

  // 사용자 생성
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.usersService.create({ createUserInput });
  }

  // 사용자 정보 수정
  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    // 사용자 정보 수정 전, password 정보의 일치 여부를 확인한다.
    await this.usersService.checkUserPassword({
      updateUserInput,
    });
    // 사용자 정보 수정 전, userAccount 정보의 중복 여부를 확인한다.
    await this.usersService.checkUserAccount({
      updateUserInput,
    });
    // 사용자 정보 수정하기
    return this.usersService.updateUser({ userId, updateUserInput });
  }

  // 유저 삭제(탈퇴)
  @Mutation(() => Boolean) // 성공 여부 리턴
  deleteUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.deleteUser({ userId });
  }

  // 삭제(탈퇴) 유저 복구
  @Mutation(() => Boolean) // 성공 여부 리턴
  restoreDeletedUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersService.restoreDeletedUser({ userId });
  }
}
