const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Movie = require('../models/movie');
const { isLoggedIn } = require('../middleware');

//INDEX

router.get('/', catchAsync(async(req, res) => {
    const movies = await Movie.find({});
    res.render('movies/index', { movies })
}));

//SHOW PAGE

router.get('/:id', catchAsync(async (req, res) => {
    const movies = await Movie.findById(req.params.id).populate({
        path: 'reviews', 
        populate: {
            path: 'author'
        }}) 
    res.render('movies/show', { movies });
}));

// DELETE

router.delete('/:id', isLoggedIn, catchAsync(async(req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect(`/movies`);
}));

module.exports = router;