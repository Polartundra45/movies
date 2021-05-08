const mongoose = require('mongoose');
const Review = require('../models/review');

const movieSchema = new mongoose.Schema({
    image: String, 
    title: String,
    released: Number,
    rating: Number, 
    description: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

movieSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Comment.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;