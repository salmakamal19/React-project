const Post = require("./../models/postModel.js");
const APIError = require("./../utils/APIError.js");

// Create Post
const CreatePost = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        throw new APIError("Title and Content are Required", 410);
    }
    // const post = await Post.create({ ...req.body, userId: req.user._id });
    const post = await Post.create(req.body);
    res.status(201).json({
        message: "Post is Created Successfully",
        data: { post, }
    });
};

// Get All Posts
const getAllPosts = async (req, res) => {
    // const myPosts = await Post.find({ userId: req.user._id });
    const myPosts = await Post.find();
    const otherPosts = await Post.find({ userId: undefined });
    if (!myPosts && !otherPosts) {
        throw new APIError("Posts are NOT Found")
    }
    res.status(201).json({
        message: "Posts are Fetched Successfully",
        data: {
            myPosts,
            otherPosts,
        }
    });
};

// Get Post
const getOnePost = async (req, res) => {
    const { id } = req.params;
    // const myPost = await Post.findOne({ _id: id, userId: req.user._id });
    const myPost = await Post.findOne({ _id: id });
    const otherPost = await Post.findOne({ _id: id, userId: undefined });
    if (!myPost && !otherPost) {
        throw new APIError("Post is NOT Found", 401);
    }
    res.status(201).json({
        message: "Post is Fetched Successfully",
        data: {
            myPost,
            otherPost,
        }
    });
};

// Update Post
const UpdatePost = async (req, res) => {
    const { postId } = req.params;
    // const post = await Post.findOneAndUpdate({ userId: req.user._id, _id: id }, req.body, { new: true, });
    const post = await Post.findOneAndUpdate({ _id:postId }, req.body, { new: true } );
    if (!post) {
        throw new APIError("You can NOT Update this Post", 402);
    }
    res.status(201).json({
        message: "Post is Updated Successfully",
        data: { post, }
    })
};
const toggleFavorite = async (req, res) => {
    const { id } = req.params; // The postId from the URL

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    // Toggle the favorite status
    post.favorite = !post.favorite;

    await post.save();

    res.status(200).json({
        message: post.favorite ? "Post favorited" : "Post unfavorited",
        data: post
    });
};

// Delete Post
const deletePost = async (req, res) => {
    const { id } = req.params;
    // const post = await Post.findOneAndDelete({ userId: req.user._id, _id: id });
    const post = await Post.findOneAndDelete({ _id: id });
    if (!post) {
        throw new APIError("You can NOT Delete this Post", 403);
    }
    res.status(201).json({ message: "Post is Deleted Successfully", })
};

// Export
module.exports = { CreatePost, getAllPosts, getOnePost, UpdatePost,toggleFavorite , deletePost };