/**
 * @swagger
 * /audit/get-regions:
 *   get:
 *     summary: Get regions
 *     tags: [Audit]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        id:
 *                          type: string
 *                          example: 1
 *                        regionCode:
 *                          type: string
 *                          example: AB
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
 * /audit/get-weather-station/{regionId}:
 *   get:
 *     summary: Get regions
 *     tags: [Audit]
 *     parameters:
 *      - name: regionId
 *        in: path
 *        description: id of region
 *        example: 1
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        id:
 *                          type: string
 *                          example: 1
 *                        hdd:
 *                          type: string
 *                          example: 5565
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
 * /audit/get-nbc:
 *   get:
 *     summary: Get regions
 *     tags: [Audit]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        id:
 *                          type: string
 *                          example: 1
 *                        nbcTireTitle:
 *                          type: string
 *                          example: Tire 1
 *                        ecPoints:
 *                          type: string
 *                          example: 1
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
 * /audit/get-ecPoints/{tierId}:
 *   get:
 *     summary: Get ECpoints
 *     tags: [Audit]
 *     parameters:
 *      - name: tierId
 *        in: path
 *        description: id of tier
 *        example: 1
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        id:
 *                          type: string
 *                          example: 1
 *                        ecPoint:
 *                          type: string
 *                          example: 5565
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
 * /audit/get-zone/{weatherStationId}:
 *   get:
 *     summary: Get zone
 *     tags: [Audit]
 *     parameters:
 *      - name: weatherStationId
 *        in: path
 *        description: id of tier
 *        example: 1
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        id:
 *                          type: string
 *                          example: 1
 *                        zone:
 *                          type: string
 *                          example: 7A
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
 * /audit/get-credit:
 *   get:
 *     summary: Get credit
 *     tags: [Audit]
 *     parameters:
 *      - name: volume
 *        in: query
 *        description: volume
 *        example: 1234.56
 *        required: true
 *      - name: unit
 *        in: query
 *        description: Value of unit
 *        example: 1
 *        required: true
 *      - name: requiredEcp
 *        in: query
 *        description: Value of requiredEcp
 *        example: 10
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        credit:
 *                          type: string
 *                          example: 1
 *                        requiredEcp:
 *                          type: string
 *                          example: 10
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
 * /audit/get-assembly:
 *   get:
 *     summary: Get assembly
 *     tags: [Audit]
 *     parameters:
 *      - name: homeType
 *        in: query
 *        description: id of homeType
 *        example: 1
 *        required: false
 *      - name: zone
 *        in: query
 *        description: zone
 *        example: 7A
 *        required: false
 *      - name: auditId
 *        in: query
 *        description: auditId
 *        example: 8
 *        required: false
 *     responses:
 *       200:
 *         description: success
 *         content:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 * @swagger
 * /audit/create-audit:
 *   post:
 *     summary: Create Audit
 *     tags: [Audit] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auditId:
 *                  type: string
 *                  example: 0
 *               firstName:
 *                  type: string
 *                  example: James
 *               lastName:
 *                  type: string
 *                  example: Stiger
 *               phone:
 *                  type: string
 *                  example: 1234567890
 *               emailId:
 *                  type: string
 *                  example: jamesstiger.cis@gmail.com
 *               pincode1:
 *                  type: string
 *                  example: 123456
 *               addressLine1:
 *                  type: string
 *                  example: Science city 
 *               userProvinceId:
 *                  type: integer
 *                  example: 1
 *               type:
 *                  type: integer
 *                  example: 1
 *               title:
 *                  type: string
 *                  example: Property title
 *               address:
 *                  type: string
 *                  example: Property address
 *               city:
 *                  type: string
 *                  example: ahmedabad
 *               propertyProvinceId:
 *                  type: integer
 *                  example: 1
 *               postalCode:
 *                  type: string
 *                  example: 123456
 *               projectName:
 *                  type: string
 *                  example: Bopal, Ahmedabad 
 *               addressLine2:
 *                  type: string
 *                  example: Science city 
 *               projectProvinceId:
 *                  type: integer
 *                  example: 1
 *               pincode2:
 *                  type: string
 *                  example: 123456
 *               weatherStationId:
 *                  type: integer
 *                  example: 1
 *               hdd:
 *                  type: integer
 *                  example: 5565 
 *               nbcClimateZone:
 *                  type: string
 *                  example: 5
 *               nbcPerspectiveTierId:
 *                  type: integer
 *                  example: 1
 *               houseTypeId:
 *                  type: integer
 *                  example: 1
 *               fdwrPercent:
 *                  type: number
 *                  example: 14.4
 *               volume:
 *                  type: number
 *                  example: 25220
 *               credit:
 *                  type: number
 *                  example: 10.0
 *               ecpRequired:
 *                  type: number
 *                  example: 13.30
 *               selectedAssembly:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      assemblyId:
 *                        type: number
 *                      cost:
 *                        type: number
 *                  example:
 *                    - assemblyId: 123
 *                      cost: 202220
 *                    - assemblyId: 456
 *                      cost: 202220
 *                    - assemblyId: 789
 *                      cost: 202220
 *                    - assemblyId: 101112
 *                      cost: 202220
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
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: access token of signup 
 
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
 * /audit/get-request-count:
 *   get:
 *     summary: Get request count
 *     tags: [Audit]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        new:
 *                          type: number
 *                          example: 1
 *                        accept:
 *                          type: number
 *                          example: 1
 *                        onGoing:
 *                          type: number
 *                          example: 1
 *                        completed:
 *                          type: number
 *                          example: 1
 *                        rejected:
 *                          type: number
 *                          example: 1
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
* /audit/get-requests:
*   get:
*     summary: Get requests
*     tags: [Audit]
*     parameters:
*       - in: query
*         name: page
*         schema:
*           type: number
*       - in: query
*         name: status
*         schema:
*           type: number
*       - in: query
*         name: sortBy
*         schema:
*           type: string
*     responses:
*       200:
*         description: success
*         content:
*           multipart/form-data:
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
*                     requests:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: number
*                             example: 10
*                           projectName:
*                             type: string
*                             example: Test Project
*                           firstName:
*                             type: string
*                             example: Test
*                           lastName:
*                             type: string
*                             example: Name
*                           addressLine1:
*                             type: string
*                             example: Test Add1
*                           addressLine2:
*                             type: string
*                             example: Test Add2
*                           pincode:
*                             type: string
*                             example: "690069"
*                           auditStatusId:
*                             type: number
*                             example: 2
*                           auditStatusLog:
*                             type: array
*                             items:
*                               type: object
*                               properties:
*                                 auditStatusId:
*                                   type: number
*                                   example: 1
*                                 createdAt:
*                                   type: string
*                                   format: date-time
*                                   example: "2024-04-01T14:09:51.000Z"
*                           auditAssemblySelection:
*                             type: array
*                             items:
*                               type: object
*                               properties:
*                                 cost:
*                                   type: string
*                                   example: "0.00"
*                                 assembly:
*                                   type: object
*                                   properties:
*                                     categoryTitle:
*                                       type: string
*                                       example: Above Grade Walls
*                                     assemblyTitle:
*                                       type: string
*                                       example: AGW#02 - Drywall + R22 batt @ 16" o.c. + 7 / 16" OSB + Brick
*                                     subTitle:
*                                       type: string
*                                       example: Lumber Stud - Stud dimensional lumber - 38 mm x 140 mm (2"x6") with RSI=1.19 m²K/W
*                                     standardCost:
*                                       type: string
*                                       example: "24200.00"
*                                     totalEffectiveRSI:
*                                       type: string
*                                       example: "3.13"
*                                     totalEffectiveRValue:
*                                       type: string
*                                       example: "17.78"
*                     perPage:
*                       type: number
*                       example: 5
*                     nextPage:
*                       type: number
*                       example: 1
*                     totalRecord:
*                       type: number
*                       example: 4
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
/**
* @swagger
 * /audit/accept-reject:
 *   post:
 *     summary: Audit accept reject.
 *     tags: [Audit] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auditId:
 *                  type: number
 *                  example: 1
 *               auditStatusId:
 *                  type: number
 *                  example: 1
 *               reason:
 *                  type: string
 *                  example: Reason for rejection
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
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: access token of signup 
 
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
 * /audit/get-audit-result:
 *   post:
 *     summary: Get audit result
 *     tags: [Audit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auditId:
 *                  type: integer
 *                  example: 3
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        new:
 *                          type: number
 *                          example: 1
 *                        accept:
 *                          type: number
 *                          example: 1
 *                        onGoing:
 *                          type: number
 *                          example: 1
 *                        completed:
 *                          type: number
 *                          example: 1
 *                        rejected:
 *                          type: number
 *                          example: 1
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
 * /audit/create-audit-request:
 *   post:
 *     summary: Create audit request
 *     tags: [Audit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                  type: integer
 *                  example: 3
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        new:
 *                          type: number
 *                          example: 1
 *                        accept:
 *                          type: number
 *                          example: 1
 *                        onGoing:
 *                          type: number
 *                          example: 1
 *                        completed:
 *                          type: number
 *                          example: 1
 *                        rejected:
 *                          type: number
 *                          example: 1
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
 * /audit/start-audit:
 *   post:
 *     summary: Start Audit
 *     tags: [Audit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auditId:
 *                  type: integer
 *                  example: 3
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        new:
 *                          type: number
 *                          example: 1
 *                        accept:
 *                          type: number
 *                          example: 1
 *                        onGoing:
 *                          type: number
 *                          example: 1
 *                        completed:
 *                          type: number
 *                          example: 1
 *                        rejected:
 *                          type: number
 *                          example: 1
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
 * /audit/get-audit-details/{auditId}:
 *   get:
 *     summary: Get audit details
 *     tags: [Audit]
 *     parameters:
 *      - name: auditId
 *        in: path
 *        description: id of audit
 *        example: 1
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           multipart/form-data:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        id:
 *                          type: string
 *                          example: 1
 *                        hdd:
 *                          type: string
 *                          example: 5565
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
* /audit/get-customer-audit-requests:
*   get:
*     summary: Get customer audit requests
*     tags: [Audit]
*     parameters:
*       - in: query
*         name: page
*         schema:
*           type: number
*       - in: query
*         name: propertyId
*         schema:
*           type: number
*     responses:
*       200:
*         description: success
*         content:
*           multipart/form-data:
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
*                     requests:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: number
*                             example: 10
*                           projectName:
*                             type: string
*                             example: Test Project
*                           firstName:
*                             type: string
*                             example: Test
*                           lastName:
*                             type: string
*                             example: Name
*                           addressLine1:
*                             type: string
*                             example: Test Add1
*                           addressLine2:
*                             type: string
*                             example: Test Add2
*                           pincode:
*                             type: string
*                             example: "690069"
*                           auditStatusId:
*                             type: number
*                             example: 2
*                     perPage:
*                       type: number
*                       example: 5
*                     nextPage:
*                       type: number
*                       example: 1
*                     totalRecord:
*                       type: number
*                       example: 4
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

/**
 * @swagger
 * /audit/get-home-details:
 *   get:
 *     summary: Get home details
 *     tags: [Audit]
 *     parameters:
 *      - name: auditId
 *        in: query
 *        description: auditId
 *        example: 8
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 * /audit/get-property-details:
 *   get:
 *     summary: Get property details
 *     tags: [Audit]
 *     parameters:
 *      - name: auditId
 *        in: query
 *        description: auditId
 *        example: 8
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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