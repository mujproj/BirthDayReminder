const { check,sanitizeBody } = require('express-validator');
exports.form=[
  // first Name validation
  check('firstName').trim().notEmpty().withMessage('First Name required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
 // last Name validation
  check('lastName').notEmpty().withMessage('Last Name required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
  // email address validation
  check('email').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),
  // password validation
  check('password').trim().notEmpty().withMessage('Password required')
  .isLength({ min: 8 }).withMessage('password must be minimum 5 length')
  .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
  .not().matches(/^$|\s+/).withMessage('White space not allowed'),

  check('mobileNumber').trim().notEmpty().withMessage('Mobile Number required')
  .isLength({min: 10, max: 10}).withMessage('Mobile Number must be of 10 digit')
  .matches(/^\d{10}$/).withMessage('Mobile Number should be a 10 digit'),

  check('username').trim().notEmpty().withMessage('Username Required')
  .isLength({min : 3}).withMessage('Username should be minimum of 3 characters'),

  check('firstName').trim().notEmpty().withMessage('First Name is required'),

  check('lastName').trim().notEmpty().withMessage('Last Name is required')
  // confirm password validation
//   check('confirmPassword').custom((value, { req }) => {
//        if (value !== req.body.password) {
//              throw new Error('Password Confirmation does not match password');
//         }
//         return true;
//    })
]

exports.feedFormValidation = [
  check('personName').trim().notEmpty().withMessage('Person Name is required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),

  check('personDOB').trim().isDate().withMessage("Please enter proper Date"),
  check('personEmail').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email')
]