const express = require('express');
const router = express.Router();
const {getPosts, getPost, createPost, updatePost, deletePost} = require('../controllers/postController.js')





   //get all posts
router.get('/', getPosts )

//getting a single post
router.get('/:id', getPost);

//create new post
router.post('/', createPost);

//Update Post
router.put('/:id', updatePost);


router.delete('/:id', deletePost);

module.exports = router;