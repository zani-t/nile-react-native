require('dotenv').config()

const express = require('express');
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
app.use('/api/articles', articleRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
