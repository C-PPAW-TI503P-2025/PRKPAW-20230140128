const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { addUserData } = require('../middleware/permissionMiddleware');
const { validatePresensiUpdate } = require('../middleware/presensiValidation');

router.use(addUserData);
router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);
router.delete("/:id", presensiController.deletePresensi);
router.put("/:id", validatePresensiUpdate, presensiController.updatePresensi);

module.exports = router;