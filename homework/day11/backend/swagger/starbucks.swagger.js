/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 스타벅스 메뉴와 이미지링크 가져오기.
 *     description: DB에 저장된 모든 스타벅스 메뉴들의 이름(String)과 img url(String), 자동생성된 _id(ObjectID)값을 가져옵니다.
 *     tags: [Starbucks]
 *     responses:
 *       200:
 *         description: 성공.
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          _id:
 *                              type: ObjectId
 *                              example: 62d19c6111ea4e8be342f023
 *                          name:
 *                              type: String
 *                              example: 먹어도 살안찌는 마법의 돌체라떼
 *                          img:
 *                              type: String
 *                              example: https://이미지주소/이미지이름.jpg
 *                          __v:
 *                              type: Int32
 *                              example: 0
 */