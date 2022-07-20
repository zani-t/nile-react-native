require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articles');

// express app
const app = express();

// middelware
app.use(express.json())
app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
});

// routes
app.use('/api/articles', articleRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to db and port:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });