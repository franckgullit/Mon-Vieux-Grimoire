const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    Author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    Genre: { type: String, required: true},
    Year: { type: Number, required: true },
    ratings: [
        {
          userId: { type: String, required: true },
          grade: { type: Number, required: true },
        },
      ],
});

module.exports = mongoose.model('Book', bookSchema);