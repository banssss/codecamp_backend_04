import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

class MockUsersRepository {
  myDB = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'b@b.com', password: '0000', name: '훈이', age: 8 },
    { email: 'c@c.com', password: '0000', name: '맹구', age: 8 },
    { email: 'd@d.com', password: '0000', name: '철수', age: 8 },
  ];

  findOne({ where }) {
    const users = this.myDB.filter((data) => data.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.myDB.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      //   imports: [TypeORM....],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService); // new UsersService(UsersRepository)
  });

  // describe('findOne', () => {
  //     usersService.findOne() 테스트
  // });

  describe('create', () => {
    it('이미 존재하는 이메일인지 검증하기!!', async () => {
      const myData = {
        email: 'a@a.com',
        hashedPassword: '0000',
        name: '짱구',
        age: 8,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원 등록이 잘 되었는지 검증하기!!', async () => {
      const myData = {
        email: 'test@test.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'test@test.com',
        password: '1234',
        name: '철수',
        age: 13,
      });
    });
  });
});
