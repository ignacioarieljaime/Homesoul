/**
 * @swagger
 * /front/create-lead:
 *   post:
 *     summary: Create lead
 *     tags: [Front] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  example: James
 *               email:
 *                  type: string
 *                  example: jamesstiger.cis@gmail.com
 *               phone:
 *                  type: integer
 *                  example: 1234567890
 *               city:
 *                  type: string
 *                  example: Bopal
 *               province:
 *                  type: string
 *                  example: Ahmedabad 
 *               country:
 *                  type: string
 *                  example: India 
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
