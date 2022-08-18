interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// type AAA = {
//   name: string;
//   age: number;
//   school: string;
//   hobby?: string;
// };

// const myProfile: AAA = {
//   name: "철수",
//   age: 12,
//   school: "다람쥐초등학교",
//   hobby: "통치",
// };

// const myProfile2: IProfile = {
//   name: "철수",
//   age: 12,
//   school: "다람쥐초등학교",
//   hobby: "통치",
// };

// // 선언 병합
// interface IProfile {
//   apple: number;
// }

// const myProfile3: IProfile = {
//   name: "철수",
//   age: 12,
//   school: "다람쥐초등학교",
//   hobby: "통치",
//   apple: 123,
// };

//
//
// 1. Partial 타입
type MyType1 = Partial<IProfile>;

// 2. Required 타입
type MyType2 = Required<IProfile>;

// 3. Pick 타입
type MyType3 = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
type MyType4 = Omit<IProfile, "school">;

// 5. Record 타입
type ZZZ = "aaa" | "qqq" | "rrr"; // union 타입
type MyType5 = Record<ZZZ, number>;

// ... 훨씬 더 많이 있습니다. (대표적인 5개만.. 자세한건 자서전.. 이 아닌 docs에)

// 만약, union 타입을 만드려면...??
let zzz: ZZZ; // "aaa" | "qqq" | "rrr"
zzz === "";

let qqq: keyof IProfile; // "name" | "age" | "school" | "hobby"
qqq === "";
