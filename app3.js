const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const posts = require('./routes/posts');
const PORT = process.env.PORT || 3000;

const app = express();


//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes Middleware
app.use('/api/posts', posts);







 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));