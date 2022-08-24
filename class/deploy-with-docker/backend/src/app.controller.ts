import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // 단순 healthcheck (on k8s ingress) 을 위한 경로
  @Get('/')
  getHello() {
    return '안녕하세요';
  }
}
