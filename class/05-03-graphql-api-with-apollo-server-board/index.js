// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server';
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

// The GraphQL schema
const typeDefs = gql`
  input CreateBoardInput {
    writer: String,
    title: String,
    contents: String
  }

  type MyReturn {
    number: Int,
    writer: String,
    title: String,
    contents: String
  }

  type Query {
    # fetchBoards: MyReturn => 객체 1개를 의미
    fetchBoards: [MyReturn], # 배열 안의 객체 여러개를 의미
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String
    createBoard(createBoardInput: CreateBoardInput!): String
    createTokenOfPhone(phone: String): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // 1. 데이터를 조회하는 로직 -> DB에 접속해서 데이터 꺼내오기
      const result = [
        { number: 1, writer: "철수", title: "철수입니다.", contents: "철수용이에요@@"},
        { number: 2, writer: "영수", title: "영수입니다.", contents: "영수용이에요~~"},
        { number: 3, writer: "훈수", title: "훈수입니다.", contents: "훈수용이에요##"},
      ];

      // 2. 꺼내온 결과 응답 주기
      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);
      // 1. 데이터를 등록하는 로직 -> DB에 접속해서 데이터 저장하기
      
      // 2. 저장 결과 응답 주기
      return '게시물 등록에 성공하였습니다. apollo | gql';
    },

    createTokenOfPhone: (_, args) => {
      const myphone = args.phone;

      // 1. 폰 번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(myphone);
      if(!isValid) throw new Error("휴대폰 자릿수가 맞지 않습니다.");

      // 2. 폰 토큰 6자리 만들기
      const mytoken = getToken();

      // 3. 폰 번호에 토큰 전송하기
      sendTokenToSMS(myphone, mytoken);
      return "인증이 완료되었습니다.";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true
});

server.listen(3000).then(() => {
  console.log(`프로그램을 켜는 데 성공했습니다 - apollo | gql`);
});