const { body } = require('express-validator');
const moment = require('moment');

module.exports = {
    authenticate: [
        body('email').notEmpty().isEmail().normalizeEmail(),
        body('password').notEmpty().isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    ],
    create: [
        body('email').notEmpty().isEmail().normalizeEmail(),
        body('password').notEmpty().isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
        body('passwordConfirmation').notEmpty().custom((val, { req }) => {
            if (val !== req.body.password) return false;
            return true;
        }),
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('dateOfBirth').custom(val => {
            if (val) return moment(val, "YYYY-MM-DD").isValid();
            return true;
        }),
        body('gender').custom(val => {
            if (val) return ["male", "female"].includes(val);            
            return true;
        }),
        body('mobileNumber').notEmpty().custom(val => {                
            return /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g.test(val);
        })
    ]
}