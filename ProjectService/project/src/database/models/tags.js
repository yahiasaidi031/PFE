const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagsSchema = new mongoose.Schema({
    tag: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Tags', tagsSchema);
   