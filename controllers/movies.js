const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
    //#swagger.tags=['Movies']
    const result = await mongodb.getDatabase().db('project2').collection('movies').find();
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    });
};

const getOneMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('movies').find({ _id: movieId });
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    });
};

const createMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movie = {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        lengthOfMovie: req.body.lengthOfMovie,
        rating: req.body.rating,
        movieGenre: req.body.movieGenre
    };
    const response = await mongodb.getDatabase().db('project2').collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the movie.');
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id); 
    const movie = {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        lengthOfMovie: req.body.lengthOfMovie,
        rating: req.body.rating,
        movieGenre: req.body.movieGenre
    };
    const response = await mongodb.getDatabase().db('project2').collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().db('project2').collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
    }
};

module.exports = { getAllMovies, getOneMovie, createMovie, updateMovie, deleteMovie };