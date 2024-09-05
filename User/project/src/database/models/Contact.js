const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required']},
    email: { type: String,required: [true, 'Email is required'] },
    phone: { type: String, required: [true, 'Phone is required'] },
    object: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);