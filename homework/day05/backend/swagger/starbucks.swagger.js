/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 스타벅스 메뉴 정보 가져오기.
 *     description: 스타벅스 메뉴의 이름과 kcal 정보를 가져옵니다.
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
 *                          name:
 *                              type: string
 *                              example: 먹어도 살안찌는 마법의 돌체라떼
 *                          kcal:
 *                              type: num
 *                              example: 0
 */