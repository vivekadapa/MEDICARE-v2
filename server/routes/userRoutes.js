// userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const userController = require('../controllers/userController.js');

const error = require('../middleware/error');

router.use(error);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user's email
 *       example:
 *         id: d5fE_asz
 *         username: johndoe
 *         email: johndoe@example.com
 */

router.get('/getAllUsers', userController.getAllUsers);


/**
 * @swagger
 * /user/getUserDetails:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - $ref: '#/components/schemas/Doctor'
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The ID of the user
 *             name:
 *               type: string
 *               description: The name of the user
 *             email:
 *               type: string
 *               description: The email of the user
 *             phone:
 *               type: number
 *               description: The phone number of the user
 *             photo:
 *               type: string
 *               description: URL of the user's photo
 *             role:
 *               type: string
 *               enum: [patient, doctor, admin]
 *               description: The role of the user
 *             gender:
 *               type: string
 *               enum: [male, female, other]
 *               description: The gender of the user
 *             bloodType:
 *               type: string
 *               description: The blood type of the user
 *             isActive:
 *               type: string
 *               enum: [active, blocked]
 *               description: The status of the user
 *             appointments:
 *               type: array
 *               items:
 *                 type: string
 *                 description: IDs of appointments associated with the user
 *             orders:
 *               type: array
 *               items:
 *                 type: string
 *                 description: IDs of orders associated with the user
 *     Doctor:
 *       type: object
 *       properties:
 *         doctor:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The ID of the doctor
 *             name:
 *               type: string
 *               description: The name of the doctor
 *             email:
 *               type: string
 *               description: The email of the doctor
 *             phone:
 *               type: number
 *               description: The phone number of the doctor
 *             photo:
 *               type: string
 *               description: URL of the doctor's photo
 *             role:
 *               type: string
 *               description: The role of the doctor
 *             gender:
 *               type: string
 *               description: The gender of the doctor
 *             isActive:
 *               type: string
 *               description: The status of the doctor
 *             appointments:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the appointment
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the user
 *                       name:
 *                         type: string
 *                         description: The name of the user
 *                       email:
 *                         type: string
 *                         description: The email of the user
 *                       phone:
 *                         type: number
 *                         description: The phone number of the user
 *                       photo:
 *                         type: string
 *                         description: URL of the user's photo
 *       example:
 *         doctor:
 *           _id: 1234567890
 *           name: Dr. John Doe
 *           email: johndoe@example.com
 *           phone: 1234567890
 *           photo: http://example.com/profile.jpg
 *           role: doctor
 *           gender: male
 *           isActive: active
 *           appointments:
 *             - _id: abcdef12345
 *               user:
 *                 _id: 0987654321
 *                 name: Jane Doe
 *                 email: janedoe@example.com
 *                 phone: 9876543210
 *                 photo: http://example.com/user.jpg
 */

router.get('/getuser', auth, userController.getUserDetails);
router.put('/updateprofile', auth, userController.updateUser);
router.post('/bookappointment', auth, userController.bookappointment);
router.post('/writereview', auth, userController.writeReview);
router.get('/getuserappointments', auth, userController.getUserAppointments);
router.post('/buymedicines', auth, userController.buymedicines);
router.put('/cancelOrder/:id', auth, userController.cancelOrder)
router.get('/getmedicinehistory', auth, userController.getMedicinesBought);




//crud users based on id
/**
 * @swagger
 * /user/getuser/{userId}:
 *   get:
 *     summary: Get user details by user ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 - $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


router.get('/getuser/:userId', userController.getUserDetailsWithId);

/**
 * @swagger
 * /user/updateprofile/{userId}:
 *   put:
 *     summary: Update user profile by user ID
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user
 *               email:
 *                 type: string
 *                 description: The updated email of the user
 *               phone:
 *                 type: number
 *                 description: The updated phone number of the user
 *               photo:
 *                 type: string
 *                 description: The updated photo URL of the user
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: The updated gender of the user
 *               bloodType:
 *                 type: string
 *                 description: The updated blood type of the user
 *               isActive:
 *                 type: string
 *                 enum: [active, blocked]
 *                 description: The updated status of the user's account
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


router.put('/updateprofile/:userId', userController.updateUserWithId);


/**
 * @swagger
 * /user/deleteuser/{userId}:
 *   delete:
 *     summary: Delete a user by user ID
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the deletion was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the deletion operation
 *                   example: User Deleted Successfully
 *       500:
 *         description: Internal server error
 */



router.delete('/deleteuser/:userId', userController.deleteUser)


/**
 * @swagger
 * /user/getuserappointments/{userId}:
 *   get:
 *     summary: Get appointments of a user by user ID
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get appointments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: User Appointments Fetched Successfully
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the invalid request
 *                   example: Invalid Request
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the internal server error
 *                   example: Internal Server Error
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 */



router.get('/getuserappointments/:userId', userController.getUserAppointmentsWithId);


/**
 * @swagger
 * /user/getmedicinehistory/{userId}:
 *   get:
 *     summary: Get medicine history of a user by user ID
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get medicine history for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medicine history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: User Fetched
 *                 user:
 *                   type: object
 *                   description: User object containing medicine history
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the user
 *                       example: "65d2e960b66ef1a48f4f1835"
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: The email address of the user
 *                       example: "john@example.com"
 *                     phone:
 *                       type: number
 *                       description: The phone number of the user
 *                       example: 1234567890
 *                     photo:
 *                       type: string
 *                       description: The URL of the user's photo
 *                       example: "https://example.com/profile.jpg"
 *                     role:
 *                       type: string
 *                       description: The role of the user
 *                       example: "patient"
 *                     gender:
 *                       type: string
 *                       description: The gender of the user
 *                       example: "male"
 *                     bloodType:
 *                       type: string
 *                       description: The blood type of the user
 *                       example: "AB+"
 *                     isActive:
 *                       type: string
 *                       description: The status of the user's account
 *                       enum: [active, blocked]
 *                       example: "active"
 *                     appointments:
 *                       type: array
 *                       description: Array of appointment IDs associated with the user
 *                       items:
 *                         type: string
 *                         example: "60a17c3be204d60015a7d3d4"
 *                     orders:
 *                       type: array
 *                       description: Array of medicine order IDs associated with the user
 *                       items:
 *                         type: string
 *                         example: "60a17c3be204d60015a7d3d5"
 *       500:
 *         description: Internal server error
 */

router.get('/getmedicinehistory/:userId', userController.getMedicinesBoughtWithId);


module.exports = router;
