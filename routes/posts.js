const express = require('express');
const router = express.Router();


const posts = [
    {id : 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
    ];

   //get multiple posts
   router.get('/', (req, res) =>{
    
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));

     }else{

         res.status(200).json(posts)
    }
    



});

//getting a single post
router.get('/:id', (req, res) =>{

    const id = parseInt(req.params.id);
    //res.json(posts.filter((post) => post.id === id));
    const post = posts.find((post) => post.id === id);

    if(!post){
        res.status(404).json({msg: `A post with the id of ${id} was not found`});


    }else{

        res.status(200).json(post);
    }

});


router.post('/', (req, res) => {

    console.log(req.body);

    const newPost = {
        id: posts.length + 1,
        title: req.body.title,


        
    };

    if(!newPost.title){
        return res.status(400).json({msg: 'Please include a title'});


    }
    posts.push(newPost);
    res.status(201).json(posts);


});

module.exports = router;