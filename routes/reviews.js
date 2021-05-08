const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const Movie = require('../models/movie');
const Review = require('../models/review');
const { validateReview, isReviewAuthor, isLoggedIn } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(async(req, res) => {
    const { id } = req.params;
    const movies = await Movie.findById(id);
    const review = new Review(req.body.rev);
    movies.reviews.push(review);
    review.author = req.user._id;
    await movies.save();
    await review.save();
    res.redirect(`/movies/${id}`);
}));

router.delete('/:revId',isLoggedIn, isReviewAuthor, catchAsync(async(req, res) => {
    const { id, revId } = req.params;
    const movies = await Movie.findByIdAndUpdate(id, {$pull: {reviews: revId}});
    await Review.findByIdAndDelete(revId);
    await movies.save();
    res.redirect(`/movies/${movies._id}`)
}));

module.exports = router;