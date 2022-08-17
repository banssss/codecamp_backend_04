// import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  fetchBoards(): string {
    return 'fetchBoards를 요청하셨습니다.';
  }
}
