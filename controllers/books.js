const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb.getDatabase().db('project2').collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getOneBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

const createbook = async (req, res) => {
    //#swagger.tags=['Books']
    const book = {
        bookTitle: req.body.bookTitle,
        bookGenre: req.body.bookGenre,
        inSeries: req.body.inSeries,
        ebookAvailable: req.body.ebookAvailable,
        publishYear: req.body.publishYear,
        bookAuthor: req.body.bookAuthor,
        numberOfPages: req.body.numberOfPages
    };
    const response = await mongodb.getDatabase().db('project2').collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the book.');
    }
};

const updatebook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id); 
    const book = {
        bookTitle: req.body.bookTitle,
        bookGenre: req.body.bookGenre,
        inSeries: req.body.inSeries,
        ebookAvailable: req.body.ebookAvailable,
        publishYear: req.body.publishYear,
        bookAuthor: req.body.bookAuthor,
        numberOfPages: req.body.numberOfPages
    };
    const response = await mongodb.getDatabase().db('project2').collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

const deletebook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().db('project2').collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
};

module.exports = { getAllBooks, getOneBook, createbook, updatebook, deletebook };