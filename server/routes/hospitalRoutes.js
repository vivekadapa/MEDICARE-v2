const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

const error = require('../middleware/error')

router.use(error);


/**
 * @swagger
 * /hospital/getAllHospitals:
 *   get:
 *     summary: Get all hospitals
 *     tags: [Hospitals]
 *     parameters:
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: string
 *         description: Filter hospitals by approval status (optional)
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the hospital
 *                       name:
 *                         type: string
 *                         description: The name of the hospital
 *                       address:
 *                         type: string
 *                         description: The address of the hospital
 *                       pinCode:
 *                         type: number
 *                         description: The PIN code of the hospital
 *                       phoneNumber:
 *                         type: array
 *                         items:
 *                           type: number
 *                         description: The phone numbers of the hospital
 *                       email:
 *                         type: string
 *                         description: The email of the hospital
 *                       socials:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: The name of the social media platform
 *                             url:
 *                               type: string
 *                               description: The URL of the social media profile
 *                         description: Social media profiles of the hospital
 *                       doctors:
 *                         type: array
 *                         items:
 *                           type: number
 *                         description: IDs of doctors associated with the hospital
 *                       patients:
 *                         type: array
 *                         items:
 *                           type: number
 *                         description: IDs of patients associated with the hospital
 *                       isApproved:
 *                         type: string
 *                         enum: [pending, approved, cancelled]
 *                         description: Approval status of the hospital
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 */

router.get("/getAllHospitals", hospitalController.getAllHospitals);

/**
 * @swagger
 * /hospital/getHospital/{id}:
 *   get:
 *     summary: Get hospital details by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hospital to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hospital:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the hospital
 *                     name:
 *                       type: string
 *                       description: The name of the hospital
 *                     address:
 *                       type: string
 *                       description: The address of the hospital
 *                     pinCode:
 *                       type: number
 *                       description: The PIN code of the hospital
 *                     phoneNumber:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: The phone numbers of the hospital
 *                     email:
 *                       type: string
 *                       description: The email of the hospital
 *                     socials:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: The name of the social media platform
 *                           url:
 *                             type: string
 *                             description: The URL of the social media profile
 *                       description: Social media profiles of the hospital
 *                     doctors:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: IDs of doctors associated with the hospital
 *                     patients:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: IDs of patients associated with the hospital
 *                     isApproved:
 *                       type: string
 *                       enum: [pending, approved, cancelled]
 *                       description: Approval status of the hospital
 *       400:
 *         description: Hospital not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 message:
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
 */

router.get("/getHospital/:id", hospitalController.getHospitalDetails);

/**
 * @swagger
 * /hospital/createHospital:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the hospital
 *               address:
 *                 type: string
 *                 description: The address of the hospital
 *               pinCode:
 *                 type: number
 *                 description: The PIN code of the hospital
 *               phoneNumber:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: The phone numbers of the hospital
 *               email:
 *                 type: string
 *                 description: The email of the hospital
 *               socials:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the social media platform
 *                     url:
 *                       type: string
 *                       description: The URL of the social media profile
 *                 description: Social media profiles of the hospital
 *               doctors:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: IDs of doctors associated with the hospital
 *               patients:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: IDs of patients associated with the hospital
 *     responses:
 *       201:
 *         description: Hospital created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: Hospital created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Error creating hospital
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 */

router.post("/createHospital", hospitalController.createHospital);

/**
 * @swagger
 * /hospital/updateHospital/{id}:
 *   put:
 *     summary: Update hospital details by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hospital to update
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
 *                 description: The new name of the hospital
 *               address:
 *                 type: string
 *                 description: The new address of the hospital
 *               pinCode:
 *                 type: number
 *                 description: The new PIN code of the hospital
 *               phoneNumber:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: The new phone numbers of the hospital
 *               email:
 *                 type: string
 *                 description: The new email of the hospital
 *               socials:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the social media platform
 *                     url:
 *                       type: string
 *                       description: The URL of the social media profile
 *                 description: New social media profiles of the hospital
 *     responses:
 *       201:
 *         description: Hospital updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: Hospital updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: Hospital not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 */

router.put("/updateHospital/:id", hospitalController.updateHospital);

module.exports = router;
