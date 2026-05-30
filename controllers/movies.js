const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movies = await mongodb.getDatabase().db('project2').collection('movies').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    } catch (err) {
        res.status(400).json({ message: error });
    }
    
};

const getOneMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.');
        }
        const movieId = new ObjectId(req.params.id);
        const movies = await mongodb.getDatabase().db('project2').collection('movies').find({ _id: movieId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    } catch (err) {
        res.status(400).json({ message: error });
    }
};

const createMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
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
        }
    } catch (err) {
        res.status(500).json(response.err || 'Some error occurred while adding the movie.');
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.');
        }
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
        }
    } catch (err) {
        res.status(500).json(response.err || 'Some error occurred while updating the movie.');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.');
        }
        const movieId = new ObjectId(req.params.id); 
        const response = await mongodb.getDatabase().db('project2').collection('movies').deleteOne({ _id: movieId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json(response.err || 'Some error occurred while deleting the movie.');
    }
};

module.exports = { getAllMovies, getOneMovie, createMovie, updateMovie, deleteMovie };