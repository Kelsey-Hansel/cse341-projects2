const validator = require('./validate');

const checkBook = (req, res, next) => {
    const bookRules = {
        bookTitle: 'required|string',
        bookGenre: 'required|string',
        inSeries: 'string',
        ebookAvailable: 'string',
        publishYear: 'required|string',
        bookAuthor: 'required|string',
        numberOfPages: 'string'
    };
    validator(req.body, bookRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const checkMovie = (req, res, next) => {
    const movieRules = {
        title: 'required|string',
        releaseYear: 'required|string',
        lengthOfMovie: 'string',
        rating: 'required|string',
        movieGenre: 'string'
    };
    validator(req.body, movieRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    checkBook,
    checkMovie
};