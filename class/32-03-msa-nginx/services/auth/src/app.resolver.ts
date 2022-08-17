import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation(() => String)
  login(): string {
    return 'login을 요청하셨습니다.';
  }

  @Query(() => String)
  aaa() {
    return 'aaa';
  }
}
