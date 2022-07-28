import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  // qqq(): string {
  //   return 'Hello World!';
  // }

  findAll() {
    // 1. 데이터를 조회하는 로직 -> DB에 접속해서 데이터 꺼내오기
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '철수입니다.',
        contents: '철수용이에요@@',
      },
      {
        number: 2,
        writer: '영수',
        title: '영수입니다.',
        contents: '영수용이에요~~',
      },
      {
        number: 3,
        writer: '훈수',
        title: '훈수입니다.',
        contents: '훈수용이에요##',
      },
    ];

    // 2. 꺼내온 결과 응답 주기
    return result;
  }

  create(createBoardInput) {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);
    // 1. 데이터를 등록하는 로직 -> DB에 접속해서 데이터 저장하기

    // 2. 저장 결과 응답 주기
    return '게시물 등록에 성공하였습니다. apollo | gql';
  }
}
