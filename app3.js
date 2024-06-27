const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const posts = require('./routes/posts');
const logger = require('./middleware/logger.js');
const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/notFound.js')
const PORT = process.env.PORT || 3000;

const app = express();


//logger middleware
app.use(logger)

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//Routes 
app.use('/api/posts', posts);

//handling requests to wrong endpoints

app.use(notFound);

//Error Handling Middleware
app.use(errorHandler);




 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));