const express = require('express');

const router = express.Router();

// GET all articles
router.get('/', (request, response) => {
    response.json({mssg: 'GET all articles'})
});

// GET single article
router.get('/:id', (request, response) => {
    response.json({mssg: 'GET single article'})
});

// POST new article
router.post('/', (request, response) => {
    response.json({mssg: 'POST new article'})
});

// DELETE article
router.delete('/:id', (request, response) => {
    response.json({mssg: 'DELETE article'})
});

// UPDATE article
router.patch('/:id', (request, response) => {
    response.json({mssg: 'UPDATE article'})
});

module.exports = router;