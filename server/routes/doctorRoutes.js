const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')
const auth = require('../middleware/auth')

const error = require('../middleware/error')

router.use(error);


/**
 * @swagger
 * /doctor/profile/{id}:
 *   get:
 *     summary: Get doctor details by doctor ID
 *     tags: 
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to get details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Doctor not found
 *       500:
 *         description: Internal server error
 */
router.get('/profile/:id', doctorController.getDoctorDetails);

/**
 * @swagger
 * /doctor/getdoctor/{id}:
 *   get:
 *     summary: Get doctor details by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Doctor not found
 *       500:
 *         description: Internal Server Error
 */


router.get('/getdoctor/:id', doctorController.getDoctorDetails);


router.put('/updateDoctor',auth, doctorController.updateDoctor);

/**
 * @swagger
 * /doctor/getalldoctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: string
 *         description: Filter doctors by approval status (optional)
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                   example: true
 *                 data:
 *                   type: array
 *                   description: Array of doctor objects
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Failed to fetch doctors
 */

router.get('/getalldoctors', doctorController.getAllDoctors);

/**
 * @swagger
 * /doctor/getallconsultdoctors:
 *   get:
 *     summary: Get all consulting doctors
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: string
 *         description: Filter consulting doctors by approval status (optional)
 *     responses:
 *       200:
 *         description: Consulting doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                   example: true
 *                 data:
 *                   type: array
 *                   description: Array of consulting doctor objects
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Failed to fetch consulting doctors
 */
router.get('/getallconsultdoctors',doctorController.getAllConsultDoctors)
router.put('/updateAppointment/:status/:appointid', auth, doctorController.updateAppointment)
router.post('/manageslots', auth, doctorController.manageSlots)
router.get('/getnewappointments', auth, doctorController.getNewAppointments)
router.post('/addbio',auth,doctorController.addBio)


/**
 * @swagger
 * /doctor/updateDoctor/{id}:
 *   put:
 *     summary: Update doctor details by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: ["male", "female", "other"]
 *               phone:
 *                 type: string
 *               photo:
 *                 type: string
 *               ticketPrice:
 *                 type: number
 *               specialization:
 *                 type: string
 *               qualification:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: Updated Successfully
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Failed to update doctor details
 */

router.get('/getdoc/:id',doctorController.getdoc)
router.put('/updateDoctor/:id',doctorController.updateDoctorWId)

/**
 * @swagger
 * /doctor/deleteDoctor/{id}:
 *   delete:
 *     summary: Delete doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation
 *                   example: Deleted Doctor Successfully
 *       500:
 *         description: Error deleting doctor
 */
router.delete('/deleteDoctor/:id',doctorController.deleteDoctorWId)


/**
 * @swagger
 * /doctor/getnewappointments/{id}:
 *   get:
 *     summary: Get new appointments for a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to retrieve appointments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved doctor's new appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Doctor details with appointments
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the doctor
 *                     email:
 *                       type: string
 *                       description: The email of the doctor
 *                     name:
 *                       type: string
 *                       description: The name of the doctor
 *                     role:
 *                       type: string
 *                       description: The role of the doctor
 *                     gender:
 *                       type: string
 *                       description: The gender of the doctor
 *                     phone:
 *                       type: string
 *                       description: The phone number of the doctor
 *                     photo:
 *                       type: string
 *                       description: URL of the doctor's photo
 *                     ticketPrice:
 *                       type: number
 *                       description: The ticket price set by the doctor
 *                     specialization:
 *                       type: string
 *                       description: The specialization of the doctor
 *                     qualification:
 *                       type: string
 *                       description: The qualification of the doctor
 *                     bio:
 *                       type: string
 *                       description: Biography of the doctor
 *                     timeSlots:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           startTime:
 *                             type: string
 *                             description: Start time of the slot
 *                           endTime:
 *                             type: string
 *                             description: End time of the slot
 *                           isAvailable:
 *                             type: boolean
 *                             description: Availability of the slot
 *                     avgRating:
 *                       type: number
 *                       description: The average rating of the doctor
 *       500:
 *         description: Error retrieving doctor's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the error
 *                   example: Error in fetching Appointments
 */

router.get('/getnewappointments/:id',doctorController.getNewAppointmentsWithId)


module.exports = router;