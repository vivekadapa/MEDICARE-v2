const express = require('express');
const router = express.Router();

const otpController = require('../controllers/otpController');

const error = require('../middleware/error')

router.use(error);

router.post('/sendotp',otpController.sendOtp);
router.post('/verifyotp',otpController.verifyOtp)


module.exports = router;