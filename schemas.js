const joi = require('joi');

module.exports.reviewSchema = joi.object({
    rev: joi.object({
        rating: joi.number().required(),
        body: joi.string().required(),
    }).required()
})