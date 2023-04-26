const { default: mongoose } = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    created_at: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = {
  CommentModel,
};
