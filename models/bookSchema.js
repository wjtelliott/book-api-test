const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    year: Number,
    quantity: Number,
    imageURL: String
});

module.exports = mongoose.model('Book', bookSchema);