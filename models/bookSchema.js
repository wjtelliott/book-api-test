const
    mongoose = require('mongoose'),
    { Schema } = mongoose,

    bookSchema = new Schema({
        title: { type: String, required: true },
        description: String,
        year: Number,
        quantity: Number,
        imageURL: String
    });

module.exports = mongoose.model('Book', bookSchema);