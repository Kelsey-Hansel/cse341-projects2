const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validation = require('../validation/validationRules');
const auth = require("../authentication/authenticate");

router.get("/", booksController.getAllBooks);

router.get("/:id", booksController.getOneBook);

router.post("/", auth.isAuthenticated, validation.checkBook, booksController.createBook);

router.put("/:id", auth.isAuthenticated, validation.checkBook, booksController.updateBook);

router.delete("/:id", auth.isAuthenticated, booksController.deleteBook);

module.exports = router;