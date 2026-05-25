const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../validation/validationRules');

router.get("/", moviesController.getAllMovies);

router.get("/:id", moviesController.getOneMovie);

router.post("/", validation.checkMovie, moviesController.createMovie);

router.put("/:id", validation.checkMovie, moviesController.updateMovie);

router.delete("/:id", moviesController.deleteMovie);

module.exports = router;