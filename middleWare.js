const AppError = require('./utils/AppError');
const { reviewSchema } = require('./schemas');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
   if(!req.isAuthenticated()) {
       req.session.returnTo = req.originalUrl;
       return res.redirect('/login')
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(e => e.message).join(',');
        throw new AppError(msg, 400);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, revId } = req.params;
    const review = await Review.findById(revId);
    if(!review.author.equals(req.user._id)) {
       return res.redirect(`/movie/${id}`);
    }
    next();
};