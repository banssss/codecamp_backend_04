/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 정보 가져오기
 *     description: 유저의 메일, 이름, 전화번호, 주민번호앞6자리, 좋아하는 사이트의 정보를 가져옵니다.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공.
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: ysjang@ziphyunjeon.com
 *                          name:
 *                              type: string
 *                              example: 장영실
 *                          phone:
 *                              type: string
 *                              example: 010-7777-7777
 *                          personal:
 *                              type: string
 *                              example: 111111-2222222
 *                          prefer:
 *                              type: string
 *                              example: https://ziphyunjeon.com           
 */