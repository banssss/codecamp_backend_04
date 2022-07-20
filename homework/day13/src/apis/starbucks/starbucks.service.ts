import { Injectable } from '@nestjs/common';

@Injectable()
export class StarbucksService {
  findAll() {
    // 1. 데이터를 조회하는 로직 -> DB에 접속해서 데이터 꺼내오기
    const result = [
      {
        menu: '살안찌는프라프치노',
        price: 6200,
        kcal: 1,
        saturated_fat: 1,
        protein: 50,
        salt: 10,
        sugar: 10,
        caffeine: 20,
      },
      {
        menu: '저렴하지만살찌는커피',
        price: 1000,
        kcal: 1000,
        saturated_fat: 1000,
        protein: 500,
        salt: 1000,
        sugar: 1000,
        caffeine: 2000,
      },
      {
        menu: '그냥다방커피',
        price: 4100,
        kcal: 12,
        saturated_fat: 71,
        protein: 47,
        salt: 16,
        sugar: 29,
        caffeine: 18,
      },
      {
        menu: '카누스틱커피1포',
        price: 600,
        kcal: 12,
        saturated_fat: 1,
        protein: 5,
        salt: 1,
        sugar: 1,
        caffeine: 20,
      },
      {
        menu: '연아의맥심을스타벅스에서',
        price: 4200,
        kcal: 12,
        saturated_fat: 21,
        protein: 35,
        salt: 21,
        sugar: 81,
        caffeine: 324,
      },
    ];

    // 2. 꺼내온 결과 응답 주기
    return result;
  }

  create(createStarbucksInput) {
    console.log(createStarbucksInput);
    // 1. 데이터를 등록하는 로직 -> DB에 접속해서 데이터 저장하기

    // 2. 저장 결과 응답 주기
    return '등록에 성공하였습니다. apollo | gql';
  }
}
