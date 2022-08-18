// 각 변수 위에 마우스를 올려가며 확인해보세용 ^O ^

// 1. 문자
function getString(arg: string): string {
  return arg;
}
const result1 = getString("철수");

// 2. 숫자
function getNumber(arg: number): number {
  return arg;
}
const result2 = getNumber(8);

// 3. any 타입 - 사실상 자바스크립트와 같다.
// TS 를 쓰는 의미가 없지요
function getAny(arg: any): any {
  return arg;
}
const result31 = getAny(8);
const result32 = getAny("철수");
const result33 = getAny(true);

function getAnyReverse(arg1: any, arg2: any, arg3: any): [any, any, any] {
  return [arg3, arg2, arg1];
}
const result34 = getAnyReverse("철수", "다람쥐초등학교", 8);

// 4. generic 타입 - any와는 다르다!
function getGeneric<T>(arg: T): T {
  return arg;
}
const result41 = getGeneric(8);
const result42 = getGeneric("철수");
const result43 = getGeneric(true);

// prettier-ignore
function getGenericReverse<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
    return [arg3, arg2, arg1];
}
const result44 = getGenericReverse("철수", "다람쥐초등학교", 8);

// prettier-ignore
function getGenericReverseT<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}
const result45 = getGenericReverseT("철수", "다람쥐초등학교", 8);

// prettier-ignore
function getGenericReverseTUV<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
    return [arg3, arg2, arg1];
}
// prettier-ignore
const result46 = getGenericReverseTUV<string, string, number>("철수", "다람쥐초등학교", 8);

// 이런, GENERIC 은 누가 제일 많이 만드나요??
// Library 제작자들이(ex. npm 등), 제작한 의도에 맞추어 사용할 수 있도록 Generic 을 사용하곤 합니다.
// any 는 그냥 JS 입니다. TS 을 사용하기 위해 Generic 을 사용합니다.
