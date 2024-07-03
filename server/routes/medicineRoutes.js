const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController.js");
//

router.get("/getMedicines", medicineController.getAllMedicines);

module.exports = router;
