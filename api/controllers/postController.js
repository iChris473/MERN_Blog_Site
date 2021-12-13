
require('../models/db');
const Post = require('../models/Post');


// CREATE POST
exports.createPost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
       await newPost.save();
       res.status(200).json(newPost)
    } catch (err) {
       res.status(500).json(err) 
    }
}

// UPDATE USER
exports.updatePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if(req.body.username === post.username){
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
            {$set: req.body},
            {new: true});
            res.status(200).json(updatedPost)
      } else{
        res.status(500).json('You can only update your post')
      }
   } catch (err) {
       res.status(500).json(err)
   }
};

// DELETE USER
exports.deletePost = async (req, res) => {
    
        try {
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                await post.delete();
                res.status(200).json('Post has been deleted')
            } else {
                res.status(404).json('You can only delete your post')
            }
        } catch (err) {
            res.status(400).json(err)
        }
       
    }

// GET USER
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json(err)
    }
}

// GET ALL POST
exports.getAllPosts = async (req, res) => {

    const username = req.query.user
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            })
        } else {
            posts = await Post.find({});
        }
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json(err)
    }
}

