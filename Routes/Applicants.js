const express = require('express');
const router = express.Router();
const ApplicantController = require('../Controllers/applicantController');
const authMiddleware = require('../Middlewares/auth');


// Get all Applicants (public)
router.get('/', ApplicantController.getApplicantData);


// Process a new Applicant Form Data
router.post('/', ApplicantController.processApplicantData);


// Delete a Applicant data (admin only)
router.delete('/:id', authMiddleware.verifyAdmin, ApplicantController.deleteApplicantData);


module.exports = router;

