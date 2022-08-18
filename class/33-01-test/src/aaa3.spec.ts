import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  // beforeAll() 실행 전 1회
  beforeEach(async () => {
    //app.module 을 대체하는 TestingModule.
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AppService],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // afterEach() 끝나고 각각
  // afterAll() 끝나고 1회
});
