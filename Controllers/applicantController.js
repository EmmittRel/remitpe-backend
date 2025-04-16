const multer = require('multer');
const ApplicantData = require('../models/Applicants');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Set up Multer to handle a single file with the field name 'resume'
const upload = multer({ storage: storage }).single('resume');

// Process applicant data
exports.processApplicantData = async (req, res) => {
    // Handle file upload
    upload(req, res, async (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).json({ message: `File upload error: ${err.message}` });
        }

        const { name, email, country, skills } = req.body;
        const resume = req.file ? req.file.path : ''; // Path to the uploaded resume file

        // Check if all required fields are present
        if (!name || !email || !country || !skills) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Create a new applicant data entry
            const applicantData = new ApplicantData({
                name,
                email,
                country,
                skills,
                resume
            });

            // Save the applicant data to the database
            const savedApplicantData = await applicantData.save();
            res.status(201).json({ message: 'Form submitted successfully', data: savedApplicantData });
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: `Error saving data: ${err.message}` });
        }
    });
};

// Get all applicants' data
exports.getApplicantData = async (req, res) => {
    try {
        const applicantData = await ApplicantData.find();
        res.json(applicantData);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ message: `Error retrieving data: ${err.message}` });
    }
};

// Delete an applicant's data
exports.deleteApplicantData = async (req, res) => {
    try {
        const result = await ApplicantData.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.json({ message: 'Applicant data deleted' });
        } else {
            res.status(404).json({ message: 'Applicant data not found' });
        }
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ message: `Error deleting data: ${err.message}` });
    }
};
