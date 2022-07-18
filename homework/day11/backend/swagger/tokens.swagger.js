/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 회원 가입 인증번호(token) 생성하기
 *     description: 요청시 입력받은 phone 정보를 통해 입력받은 번호로 인증번호(token)를 문자메시지로 전송
 *     tags: [Tokens]
 *     requestBody:
 *           description: phone 을 입력받아 전송 | 이미 DB에 존재하는 번호라면, 토큰 재발급(최신토큰유지)
 *           required: true
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         phone:
 *                             type: string
 *                             example: "01091605852"
 *                
 *     responses:
 *           200:
 *             description: 핸드폰으로 인증 문자가 전송되었습니다! 응답
 *           422:
 *             description: 이미 가입되어있는 번호라면, '이미 가입되어있는 번호입니다' 응답
 * 
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 입력받은 인증번호 비교하기
 *     description: 입력받은 phone 번호를 통해 Token DB 탐색. 토큰 일치/불일치시 true/false 응답
 *     tags: [Tokens]
 *     requestBody:
 *           description: 입력받은 번호, 입력받은 인증번호(token)
 *           required: true
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         token:
 *                             type: string
 *                             example: "094592"
 *                         phone:
 *                             type: string
 *                             example: "01091605852"
 *                
 *     responses:
 *           200:
 *             description: 인증번호(token)가 일치하고 Token 문서의 isAuth가 false 라면, true로 변경하여 DB 저장. 저장후 true 응답 | 인증번호 불일치시 false 응답.
 * 
 */