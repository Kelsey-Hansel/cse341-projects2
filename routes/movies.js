const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../validation/validationRules');
const auth = require("../authentication/authenticate");

router.get("/", moviesController.getAllMovies);

router.get("/:id", moviesController.getOneMovie);

router.post("/", auth.isAuthenticated, validation.checkMovie, moviesController.createMovie);

router.put("/:id", auth.isAuthenticated, validation.checkMovie, moviesController.updateMovie);

router.delete("/:id", auth.isAuthenticated, moviesController.deleteMovie);

module.exports = router;