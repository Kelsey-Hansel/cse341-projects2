const express = require('express');
const router = express.Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=['Landing Page']
    res.send("Books and Movies catalog.")
});

router.use("/books", require("./books"));

router.use("/movies", require("./movies"));

module.exports = router;