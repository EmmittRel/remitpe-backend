const express = require('express');
const router = express.Router();
const PortalController = require('../Controllers/portalController');
const authMiddleware = require('../Middlewares/auth');


// Get all Jobs (public)
router.get('/', PortalController.getJobs);


// Create a new Job vacancy (admin only)
router.post('/', authMiddleware.verifyAdmin, PortalController.createJob);


// Update a Job (admin only)
router.put('/:id', authMiddleware.verifyAdmin, PortalController.updateJob);


// Delete a Job (admin only)
router.delete('/:id', authMiddleware.verifyAdmin, PortalController.deleteJob);


// Get a single job by ID (public)
router.get('/:id', PortalController.getJobById);


module.exports = router;
