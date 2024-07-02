const express = require('express');
const router = express.Router();


let posts = [
    {id : 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
    ];



   //get all posts
   router.get('/', (req, res, next) =>{
    
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));

     }else{

         res.status(200).json(posts)
    }
    



});

//getting a single post
router.get('/:id', (req, res, next) =>{

    const id = parseInt(req.params.id);
    //res.json(posts.filter((post) => post.id === id));
    const post = posts.find((post) => post.id === id);

    if(!post){
       const error = new Error(`A post with the id of ${id} was not found`);
       error.status = 404;
       return next(error);//passing in error object to next middleware


    }

        res.status(200).json(post);
    

});

//create new post
router.post('/', (req, res, next) => {

    console.log(req.body);

    const newPost = {
        id: posts.length + 1,
        title: req.body.title,


        
    };

    if(!newPost.title){
        const error = new Error('Please include a title');
       error.status = 400;
       return next(error);//passing in error object to next middleware



    }
    posts.push(newPost);
    res.status(201).json(posts);


});

//Update Post
router.put('/:id', (req, res, next) => {

const id = parseInt(req.params.id);
const post = posts.find((post) => post.id === id);


if(!post){
    const error = new Error(`A post with the id of ${id} was not found`)
    error.status = 400;
    return next(error);
}

post.title = req.body.title;//update post with new title found in the body
res.status(200).json(posts);

});


router.delete('/:id', (req, res, next) => {
//find id
const id = parseInt(req.params.id);

//find post

const post = posts.find((post) => post.id === id);

//handle error if post doesn't exist

if(!post){

    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    return next(error);//passing in error object to next middleware


}

posts = posts.filter((post)=> post.id !== id);//update post array with all post except for the one chosen

res.status(200).json(posts);

});

module.exports = router;