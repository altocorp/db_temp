const express = require('express');

const router = express.Router();

const Post  = require('../models/Post');


// Get all the posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({ message: err });
    }
});


//Post something
router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    
    //return a promise
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({ message: err });
    }

});


//Specific post grace a ':' qui va renvoyer le post en question lorsque la requete http://localhost:3000/posts/5f8cb8f3 est execute (5f8... est l'id donné par la db) 
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({ message: err });
    }
});

//delete post with title = "my third post"
router.delete('/:postId', async (req, res) => {
    try {
        const deletePost = await Post.deleteOne({ "title": "my third post" });
        res.json(deletePost);
    }catch(err){
        res.json({ message: err });
    }
});

//update post
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = 
        await Post.updateOne({ _id: req.params.postId }, { $set: { "title": "My second post has been updated" }}
        );
        // await Post.updateOne({ _id: req.params.postId }, { $set: { "title": req.body.title }}
        // );
        res.json(updatePost);
    }catch(err){
        res.json({ message: err });
    }
});


module.exports = router;


        // .then(data => {
        //     res.status(200).json(data);
        // })
        // .catch(err => {
        //     res.status(404).json({ message: err });
        // });