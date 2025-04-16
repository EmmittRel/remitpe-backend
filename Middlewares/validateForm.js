const { check, validationResult } = require('express-validator');

exports.validateFirstForm = [
  check('fullName', 'Name is required').not().isEmpty(),
  check('businessEmail', 'Please include a valid business email').isEmail()
];

exports.validateSecondForm = [
  check('formId', 'Form ID is required').not().isEmpty(),
  check('designation', 'Designation is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('exploreOptions', 'At least one option must be selected').not().isEmpty()
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};