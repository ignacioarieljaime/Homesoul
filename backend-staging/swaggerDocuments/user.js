/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User Signup
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                  type: integer
 *                  example: 1
 *               firstName:
 *                  type: string
 *                  example: krupa
 *               lastName:
 *                  type: string
 *                  example: patel
 *               phoneNo:
 *                  type: string
 *                  example: 9574881418
 *               emailID:
 *                  type: string
 *                  example: patelkrupa@gmail.com
 *               password:
 *                  type: string
 *                  example: test@123
 *               confirmPassword:
 *                  type: string
 *                  example: test@123
 *               pincode:
 *                  type: string
 *                  example: 123456
 *               provinceId:
 *                  type: integer
 *                  example: 1
 *               addressLine1:
 *                  type: string
 *                  example: Sciance city 
 *               addressLine2:
 *                  type: string
 *                  example: bopal, Ahmedabad 
 *               energyAudit:
 *                  type: integer
 *                  example: 1
 *               consultation:
 *                  type: integer
 *                  example: 1
 *               investment:
 *                  type: integer
 *                  example: 1
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
 *               firstName:
 *                  type: string
 *                  example: krupa
 *               lastName:
 *                  type: string
 *                  example: patel
 *               phoneNo:
 *                  type: string
 *                  example: 9574881418
 *               emailID:
 *                  type: string
 *                  example: patelkrupa@gmail.com
 *               password:
 *                  type: string
 *                  example: test@123
 *               addressLine1:
 *                  type: string
 *                  example: Science city 
 *               addressLine2:
 *                  type: string
 *                  example: bopal, Ahmedabad 
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
 * /user/verify-account:
 *   post:
 *     summary: Account verify
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                  type: string
 *                  example: token
 
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
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  example: King@gmail.com
 *               password:
 *                  type: string
 *                  example: abc@123 
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
 *                     name:
 *                       type: string
 *                       example: Ray nanda 
 *                     email:
 *                       type: string
 *                       example: abd@gmail.com
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
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User] 
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
 *                     name:
 *                       type: string
 *                       example: Ray nanda 
 *                     email:
 *                       type: string
 *                       example: abd@gmail.com
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
 * /user/forgot-password:
 *   post:
 *     summary: User login
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  example: King@gmail.com
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
 * /user/reset-password:
 *   post:
 *     summary: User Password Update
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                  type: string
 *                  example: abcd@123
 *               password:
 *                  type: string
 *                  example: abcd@123
 *               confirmPassword:
 *                  type: string
 *                  example: abcd@123
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
 * /user/profile/update:
 *   post:
 *     summary: User Profile Update
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                  type: string
 *                  example: riddhi
 *               lastName:
 *                  type: string
 *                  example: patel
 *               phoneNo:
 *                  type: string
 *                  example: 8854545545
 *               emailID:
 *                  type: string
 *                  example: patelriddhi@gmail.com
 *               pincode:
 *                  type: string
 *                  example: 123456
 *               addressLine1:
 *                  type: string
 *                  example: Sciance city 
 *               addressLine2:
 *                  type: string
 *                  example: bopal, Ahmedabad 
 *               documentTypeId:
 *                  type: Number
 *                  example: 1
 *               documentFile:
 *                  type: string
 *                  format: binary
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
 * /user/delete/:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
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
 * /user/logout/:
 *   get:
 *     summary: Logout user
 *     tags: [User]
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
 * /user/save-auditor-pincode:
 *   post:
 *     summary: User Save Auditor Pincode
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provinceId:
 *                  type: string
 *                  example: 1
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
 * /user/get-auditor-pincode:
 *   get:
 *     summary: User Get Auditor Pincode
 *     tags: [User]
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
 * /user/delete-pincode:
 *   delete:
 *     summary: User Delete Auditor Pincode
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                  type: integer
 *                  example: 123
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