const express = require('express');
const router = express.Router();


let posts = [
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

//create new post
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

//Update Post
router.put('/:id', (req, res) => {

const id = parseInt(req.params.id);
const post = posts.find((post) => post.id === id);


if(!post){

    return res
    .status(404)
    .json({msg: `A post with the id of ${id} was not found`});
}

post.title = req.body.title;//update post with new title found in the body
res.status(200).json(posts);

});


router.delete('/:id', (req, res) => {
//find id
const id = parseInt(req.params.id);

//find post

const post = posts.find((post) => post.id === id);

//handle error if post doesn't exist

if(!post){

    return res.status(404).json(`Cannot find post with id of ${id}`);
}

posts = posts.filter((post)=> post.id !== id);//update post array with all post except for the one chosen
res.status(200).json(posts);

});

module.exports = router;