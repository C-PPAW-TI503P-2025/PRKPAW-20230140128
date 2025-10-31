const { body, validationResult } = require('express-validator');

exports.validatePresensiUpdate = [
  body('checkIn')
    .optional()
    .isISO8601()
    .withMessage('Format waktu checkIn tidak valid. Gunakan format ISO 8601'),
  
  body('checkOut')
    .optional()
    .isISO8601()
    .withMessage('Format waktu checkOut tidak valid. Gunakan format ISO 8601')
    .custom((value, { req }) => {
      if (req.body.checkIn && new Date(value) <= new Date(req.body.checkIn)) {
        throw new Error('Waktu checkOut harus lebih besar dari checkIn');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];