const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Careers',
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    deadline:{
        type: String,
        required: true,
    },
    upload:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('Position', jobSchema);
