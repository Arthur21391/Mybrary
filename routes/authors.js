const express = require('express');
const router = express.Router();
const Author = require('../model/author')

router.get('/', async (req, res) => {

    let searchOption = {};
    if (req.query.name != null && req.query.name !== '') {

        searchOption.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(
            searchOption
        );
        res.render('authors/index', {
            authors: authors,
            searchOption: req.query
        })

    } catch (err) {
        console.log(err);
    }

})


router.get('/new', (req, res) => {
    res.render('authors/new', {
        author: new Author()
    })
})

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect('authors')

    } catch (err) {

        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }

})

module.exports = router;