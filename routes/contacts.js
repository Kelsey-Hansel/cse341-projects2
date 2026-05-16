const express = require('express');
const router = express.Router();

const contactController = require("../controllers/contacts");

router.get("/", contactController.getAll);

router.get("/:id", contactController.getOne);

module.exports = router;