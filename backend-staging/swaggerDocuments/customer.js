/**
 * @swagger
 * /customer/create-property:
 *   post:
 *     summary: Create property
 *     tags: [Customer] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                  type: integer
 *                  example: 1
 *               title:
 *                  type: string
 *                  example: Zest infotech
 *               address:
 *                  type: string
 *                  example: ahmedabad,gujarat
 *               city:
 *                  type: string
 *                  example: Bopal
 *               provinceId:
 *                  type: integer
 *                  example: 1 
 *               postalCode:
 *                  type: string
 *                  example: 380058 
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 *       500:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 */
/**
* @swagger
* /customer/get-properties:
*   get:
*     summary: Get properties
*     tags: [Customer]
*     parameters:
*       - in: query
*         name: page
*         schema:
*           type: number
*     responses:
*       200:
*         description: success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 responseCode:
*                   type: integer
*                   example: 200
*                 responseMessage:
*                    type: string
*                    example: Success
*                 responseData:
*                   type: object
*                   properties:
*                     properties:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: number
*                             example: 1
*                           userId:
*                             type: number
*                             example: 50
*                           type:
*                             type: string
*                             example: Commercial
*                           title:
*                             type: string
*                             example: Zest infotech
*                           address:
*                             type: string
*                             example: ahmedabad,gujarat
*                           city:
*                             type: string
*                             example: Bopal
*                           provinceId:
*                             type: number
*                             example: 1
*                           provinceName:
*                             type: string
*                             example: Alberta
*                           postalCode:
*                             type: string
*                             example: 380058
*                           status:
*                             type: number
*                             example: 1
*                     perPage:
*                       type: number
*                       example: 4
*                     currentPageRecordCount:
*                       type: number
*                       example: 1
*                     totalRecord:
*                       type: number
*                       example: 1
*                     totalPage:
*                       type: number
*                       example: 1
*       500:
*         description: failed
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 responseCode:
*                   type: integer
*                 responseMessage:
*                    type: string
*/
