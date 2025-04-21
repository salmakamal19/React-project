const express = require("express");
const postController = require("./../controllers/postController");
const router = express.Router();
const { createPost, updatePost } = require('../controllers/postController');

router.post("/", postController.CreatePost);          // Create Post
router.get("/", postController.getAllPosts);          // Get All Posts
router.get("/:id", postController.getOnePost);        // Get One Post
router.patch("/:postId", postController.UpdatePost);      // Update Post
router.put("/favorite/:id", postController.toggleFavorite);

// PATCH route to update an existing post
router.delete("/:id", postController.deletePost);     // Delete Post


module.exports = router;