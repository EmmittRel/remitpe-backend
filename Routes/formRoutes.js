const express = require('express');
const { 
  submitFirstForm, 
  getFormSubmission 
} = require('../controllers/dfsController');
const { 
  validateFirstForm, 
  validate 
} = require('../middlewares/validateForm');

const router = express.Router();

router
  .route('/')
  .post(validateFirstForm, validate, submitFirstForm);

router
  .route('/:id')
  .get(getFormSubmission);

module.exports = router;