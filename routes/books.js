const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../validation/validationRules');

router.get("/", booksController.getAllBooks);

router.get("/:id", booksController.getOneBook);

router.post("/", validation.checkBook, booksController.createBook);

router.put("/:id", validation.checkBook, booksController.updateBook);

router.delete("/:id", booksController.deleteBook);

module.exports = router;