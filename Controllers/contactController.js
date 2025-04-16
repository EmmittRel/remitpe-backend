const Contact = require('../models/Contact');

// @desc    Create stage 1 of contact form
// @route   POST /api/contacts/stage1
// @access  Public
exports.createStage1 = async (req, res) => {
  try {
    const { fullName, businessEmail } = req.body;

    // Check if contact already exists
    const existingContact = await Contact.findOne({ businessEmail });
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this email already exists',
      });
    }

    const contact = await Contact.create({
      fullName,
      businessEmail,
      stageCompleted: 1
    });

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Update with stage 2 data
// @route   PUT /api/contacts/stage2/:id
// @access  Public
exports.updateStage2 = async (req, res) => {
  try {
    const { designation, category, otherCategory, exploreOptions, otherOption } = req.body;
    const contactId = req.params.id;

    const updateData = {
      designation,
      category,
      exploreOptions,
      stageCompleted: 2
    };

    if (category === 'Other') {
      updateData.otherCategory = otherCategory;
    }

    if (exploreOptions.includes('Other')) {
      updateData.otherOption = otherOption;
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Public
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};