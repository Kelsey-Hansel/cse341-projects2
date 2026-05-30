const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=['Landing Page']
    res.send("Books and Movies catalog.")
});

router.get("/login", passport.authenticate('github'), (req, res) => { });

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

router.use("/books", require("./books"));

router.use("/movies", require("./movies"));

module.exports = router;