import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService

    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy, //

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy, //
  ) {}

  // @Get('/aaa)
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/auth/login')
  login() {
    // auth 서비스로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { qqq: '로그인 실행해줘' },
      { email: 'a@a.com', pw: '1234' },
    );
  }

  @Get('/boards')
  fetchBoards() {
    // resource 서비스로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}
