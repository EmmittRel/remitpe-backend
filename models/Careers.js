const mongoose = require('mongoose');


const careersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('Careers', careersSchema);
