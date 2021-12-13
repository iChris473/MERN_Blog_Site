const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const categoryController = require("../controllers/categoryController")

// REGISTER USER
router.post('/register', userController.registerUser);
// LOGIN USER
router.post('/login', userController.loginUser);
// UPDATE USER
router.put('/users/update/:id', userController.updateUser);
// DELETE USER
router.delete('/users/delete/:id', userController.deleteUser);
// GET USER
router.get('/users/:id', userController.getUser);


// CREATE POST
router.post('/post', postController.createPost);
// UPDATE POST
router.put('/post/update/:id', postController.updatePost);
// DELETE POST 
router.delete('/post/delete/:id', postController.deletePost);
// GET POST
router.get('/post/:id', postController.getPost)
// GET ALL POSTS
router.get('/', postController.getAllPosts)

// POST CATEGORIES
router.post('/categories/post', categoryController.postCategory)
// GET CATEGORIES
router.get('/categories', categoryController.getCategory)

module.exports = router;