const express = require('express');
const {
  createStage1,
  updateStage2,
  getContacts,
  getContact,
} = require('../Controllers/contactController');

const router = express.Router();

router.route('/stage1').post(createStage1);
router.route('/stage2/:id').put(updateStage2);
router.route('/').get(getContacts);
router.route('/:id').get(getContact);

module.exports = router;
