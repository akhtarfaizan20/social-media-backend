const { default: mongoose } = require("mongoose");

// Schema for the Posts
const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_at: { type: Date, default: Date.now() },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

// Model for the Posts Collection
const PostModel = mongoose.model("Post", PostSchema);

module.exports = {
  PostModel,
};
