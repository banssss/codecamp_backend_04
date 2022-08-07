import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PAYMENT_STATUS_ENUM } from 'src/commons/type/enums';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>, //

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // impUid 를 기준으로, payment 정보 찾아오기 (결제든 취소든 impUid값으로 찾는다)
  // --> 데이터가 2개일 경우 (결제 / 취소) 둘 중 하나만 찾아온다.
  // (둘 중 어떤 데이터를 찾아오는지는 정확하지 않다. 필요시 로직 수정 예정)
  async findOne({ impUid }) {
    const payment = await this.paymentsRepository.findOne({
      where: { impUid },
    });
    return payment;
  }

  // 결제내역 (payment 생성)
  async create({ impUid, paymentTotal, user, status }) {
    // 1. 결제내역 테이블(Payment)에서, 기존 내역 확인
    const checkPayment = await this.paymentsRepository.findOne({
      where: { impUid },
    });

    // 1-1. 이미 저장된 결제/취소내역이라면, 오류메시지 전달
    if (checkPayment && checkPayment.status === status) {
      if (status === PAYMENT_STATUS_ENUM.PAYMENT)
        throw new ConflictException('이미 저장된 결제내역입니다.');
      if (status === PAYMENT_STATUS_ENUM.CANCEL)
        throw new ConflictException('이미 저장된 취소내역입니다.');
    }

    // 2. 결제/취소 한 유저의 정보 찾아오기
    const buyer = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    // 3. 결제/취소 내역 테이블 (Payment) 에, 결제/취소 내역과 결제/취소 한 유저의 정보 연계하여 생성
    const payment = this.paymentsRepository.create({
      impUid,
      paymentTotal,
      user: buyer,
      status,
    });

    // 4. 생성한 정보 저장하기
    await this.paymentsRepository.save(payment);

    // 5. 결제/취소 내역 결과 프론트엔드에 돌려주기
    return payment;
  }
}
