// // new Promise(() => {

// // })
// //   .then((res) => console.log(res))
// //   .catch((error) => console.log(error));

// //
// //
// // 1. Promise 예제
// const aaa = new Promise((resolve, reject) => {
//   // 시간이 걸리는 작업(API 보내기 등)

//   if (성공) {
//     const result = "철수";
//     resolve(result);
//   } else if (실패) {
//     reject("에러가 발생했어요!!!");
//   }
// });

// 2. 내가 axios 개발자라면?
const myAxios = {
  get: (url) =>
    new Promise((resolve, reject) => {
      // 백엔드에 API 요청
      const aaa = new XMLHttpRequest();
      aaa.open("get", url);
      aaa.send();
      aaa.addEventListener("load", (res) => {
        resolve(res);
      });
    }),
  post: (url) =>
    new Promise((resolve, reject) => {
      // 백엔드에 API 요청
    }),
};

const result = await myAxios.get("https://koreanjson.com/posts/1");

//
//
// 3. Promise 실습
const fetchData = async () => {
  const response = await new Promise((resolve, reject) => {
    // 오래 걸리는 작업
    setTimeout(() => {
      // 2초가 걸려서 백엔드에서 데이터 받아옴
      const result = "철수";
      resolve(result);
    }, 2000);
  });
  console.log("완료된 값은 " + response + " 입니다.");
};

fetchData();
