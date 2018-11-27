
// references
const express = require('express');
const router = express.Router();
const Make = require('../models/make');

// GET: /makes
router.get('/', (req, res, next) => {
    // get make documents from db
    Make.find((err, makes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('makes/index', {
                title: 'Manufacturer List',
                makes: makes,
                user: req.user
            });
        }
    });
});

// GET: /makes/add
router.get('/add', (req, res, next) => {
    res.render('makes/add', {
        title: 'Add a New Manufacturer',
        user: req.user
    });
});

// POST: /makes/add
router.post('/add', (req, res, next) => {
    // use the Make model to save the new maket
    Make.create({
        name: req.body.name,
        country: req.body.country,
        year: req.body.year
    }, (err, make) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/makes');
        }
    }) ;
});

// GET: /makes/delete/abc123
router.get('/delete/:_id', (req, res, next) => {
    // get the _id parameter from the url and store in a local variable
    let _id = req.params._id;

    // use the Make model to delete the document with this id
    Make.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/makes');
        }
    });
});

// GET: /makes/edit/abc123
router.get('/edit/:_id', (req, res, next) => {
    // get _id param from url
    let _id = req.params._id;

    // use the Make model to find the selected document
    Make.findById(_id, (err, make) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('makes/edit', {
                title: 'Manufacturer Details',
                make: make,
                user: req.user
            });
        }
    });
});

// POST: /makes/edit/abc123
router.post('/edit/:_id', (req, res, next) => {
    // get the _id from the url
    let _id = req.params._id;

    // use the Mongoose update method to set all the new values
    Make.update({ _id: _id },
        { $set: {
                name: req.body.name,
                country: req.body.country,
                year: req.body.year
            }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/makes');
            }
        });
});

// make public
module.exports = router;