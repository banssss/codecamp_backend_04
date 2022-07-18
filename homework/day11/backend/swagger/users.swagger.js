/**
 * @swagger
 * /user:
 *   post:
 *     summary: 회원 가입 API | 새로운 유저 추가하기
 *     description: 요청시 입력받은 name, email, personal, prefer, pwd, phone 을 서버에 보낸다.
 *     tags: [User]
 *     requestBody:
 *           description: name, email, personal, prefer, pwd, phone 을 입력하여 전송
 *           required: true
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         name:
 *                             type: string
 *                             example: 김반석
 *                         email:
 *                             type: string
 *                             example: watermelonzv@gmail.com
 *                         personal:
 *                             type: string
 *                             example: 111111-2222222
 *                         prefer:
 *                             type: string
 *                             example: https://bans.tistory.com
 *                         pwd:
 *                             type: string
 *                             example: 1234
 *                         phone:
 *                             type: string
 *                             example: "01011112222"
 *                
 *     responses:
 *           200:
 *             description: 생성된 user의 _id를 클라이언트에 반환
 *           422:
 *             description: 저장된 번호가 없거나, 인증절차를 거치지 않은 정보라면 에러 문구 반환
 *
 * @swagger     
 * /users:
 *   get:
 *     summary: 모든 유저 정보 가져오기
 *     description: 유저의 prefer-og(title, description, image)정보, 이름, 이메일, 주민등록번호(마스킹), 좋아하는 사이트, 비밀번호, 전화번호 정보를 가져옵니다.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 성공.
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          og:
 *                              type: object
 *                              example:
 *                                  title: 끄적끄적_개발노트
 *                                  description: 김반석의 블로그입니다
 *                                  image: https://이미지주소/이미지이름.jpg
 *                          _id:
 *                              type: ObjectId
 *                              example: 62d3eb38c6cee6c4368379ff
 *                          name:
 *                              type: string
 *                              example: 김반석
 *                          email:
 *                              type: string
 *                              example: watermelonzv@gmail.com
 *                          personal:
 *                              type: string
 *                              example: 111111-2222222
 *                          prefer:
 *                              type: string
 *                              example: https://bans.tistory.com
 *                          pwd:
 *                              type: string
 *                              example: 1234
 *                          phone:
 *                              type: string
 *                              example: 01011112222
 *                          __v:
 *                              type: Int32
 *                              example: 0     
 */