const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const books = await mongodb.getDatabase().db('project2').collection('books').find().toArray(); 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const getOneBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid ID.');
        }
        const bookId = new ObjectId(req.params.id);
        const books = await mongodb.getDatabase().db('project2').collection('books').find({ _id: bookId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
        
};

const createBook = async (req, res) => {
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

const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid ID.');
    }
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

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid ID.');
    }
    const bookId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().db('project2').collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
};

module.exports = { getAllBooks, getOneBook, createBook, updateBook, deleteBook };