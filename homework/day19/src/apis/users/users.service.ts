import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // fetchUsers (모든 사용자)
  findAll() {
    return this.usersRepository.find();
  }

  // fetchUser (id 값이 일치하는 사용자)
  findOne({ userId }) {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  // createUser 사용자 생성
  async create({ createUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { userAccount: createUserInput.userAccount },
    });
    // userAccount 정보를 이용해 중복 가입 방지
    if (user)
      throw new ConflictException(
        '이미 존재하는 계정(userAccount)입니다. 다른 계정 정보를 이용하여 가입해주세요.',
      );

    return this.usersRepository.save({
      ...createUserInput, //
    });
  }

  // updateUser 사용자 정보 수정
  async updateUser({ userId, updateUserInput }) {
    const myUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const result = this.usersRepository.save({
      ...myUser,
      id: userId,
      ...updateUserInput,
    });

    return result;
  }

  // 입력된 userAccount 값의 중복여부 검증
  async checkUserAccount({ updateUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { userAccount: updateUserInput.userAccount },
    });
    if (user)
      throw new ConflictException(
        '이미 존재하는 계정(userAccount)입니다. 다른 계정 정보를 이용하여 가입해주세요.',
      );
  }

  // 입력된 password 값의 일치여부 검증
  async checkUserPassword({ updateUserInput }) {
    const user = await this.usersRepository.findOne({
      where: { password: updateUserInput.password },
    });
    if (!user)
      throw new ConflictException(
        '비밀번호(password)가 일치하지 않습니다. 회원정보를 수정할 수 없습니다.',
      );
  }

  // 회원 삭제(탈퇴)
  async deleteUser({ userId }) {
    // 소프트 삭제 - softDelete 메소드 사용
    const result = await this.usersRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  // 삭제(탈퇴) 회원 복구
  async restoreDeletedUser({ userId }) {
    // 삭제된 데이터 복구 - restore 메소드 사용
    const result = await this.usersRepository.restore({ id: userId });
    return result.affected ? true : false;
  }
}
