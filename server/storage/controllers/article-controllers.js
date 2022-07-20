const Article = require('../models/article-model');
const mongoose = require('mongoose');

// get all articles
const getArticles = async (request, response) => {
    const articles = await Article.find({});
    response.status(200).json(articles);
};

// get single article
const getArticle = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'Invalid ID'});
    }

    const article = await Article.findById(id);
    if (!article) {
        return response.status(404).json({error: 'Article not found via ID'});
    }

    response.status(200).json(article);
};

// create article
const createArticle = async (request, response) => {
    const { title, image, source, category, url } = request.body;

    // add doc to db
    try {
        const article = await Article.create({
            title, image, source, category, url
        });
        response.status(200).json(article);
    } catch (error) {
        response.status(400).json({error: error.message});
    }
};

// delete article
const deleteArticle = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'Invalid ID'});
    }

    const article = await Article.findOneAndDelete({_id: id});
    if (!article) {
        return response.status(404).json({error: 'Article not found via ID'});
    }

    response.status(200).json(article);
};

// update article
const updateArticle = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'Invalid ID'});
    }

    const article = await Article.findOneAndUpdate({_id: id}, {...request.body});
    if (!article) {
        return response.status(404).json({error: 'Article not found via ID'});
    }
    
    response.status(200).json(article);
};


module.exports = {
    getArticles, getArticle, createArticle, deleteArticle, updateArticle
};