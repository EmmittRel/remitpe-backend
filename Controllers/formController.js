const FormData = require('../models/Formdata');

exports.processFormData = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Create a new form data entry
        const formData = new FormData({
            name,
            email,
            subject,
            message
        });

        // Save the form data to the database
        const savedFormData = await formData.save();

        res.status(201).json({ message: 'Form submitted successfully', data: savedFormData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFormData = async (req, res) => {
    try {
        const formData = await FormData.find();
        res.json(formData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
