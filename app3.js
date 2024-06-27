const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const PORT = process.env.PORT || 3000;

const app = express();

const posts = [
    {id : 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'}
    ];


    //get a single post
app.get('/api/posts', (req, res) =>{
    
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));

     }else{

         res.status(200).json(posts)
    }
    



});

//getting a single post
app.get('/api/posts/:id', (req, res) =>{

    const id = parseInt(req.params.id);
    //res.json(posts.filter((post) => post.id === id));
    const post = posts.find((post) => post.id === id);

    if(!post){
        res.status(404).json({msg: `A post with the id of ${id} was not found`});


    }else{

        res.status(200).json(post);
    }

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));