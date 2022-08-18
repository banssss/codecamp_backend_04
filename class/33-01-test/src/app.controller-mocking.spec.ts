import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello(): string {
    return 'Hello World! [ TEST-RETURN-NOT-ORIGIN ] ';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    //app.module 을 대체하는 TestingModule.
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService, // 테스트용 서비스 만들기
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController); // new AppController(AppService)
  });
  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
