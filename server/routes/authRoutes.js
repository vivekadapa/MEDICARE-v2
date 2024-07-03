const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();
const multer = require('multer');
const error = require('../middleware/error')

router.use(error);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post('/signup',upload.single('photo'),authController.signup);
router.post('/login',authController.login)
module.exports = router;