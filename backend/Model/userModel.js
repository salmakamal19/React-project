const mongoose = require("mongoose");

// Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    }, { timestamps: true });

// create index for email
userSchema.index({ email: 1 }, { unique: true });

// Models
const User = mongoose.model("User", userSchema);

// Export
module.exports = User;
