const mongoose = require("mongoose");

// Post Schema
const postSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
postSchema.index({ title: 1 }, { unique: true });

// Post Model
const Post = mongoose.model("Post", postSchema);

// Export
module.exports = Post;
 

