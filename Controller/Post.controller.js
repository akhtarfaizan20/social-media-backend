const { CommentModel } = require("../Model/Comments.model");
const { PostModel } = require("../Model/Posts.model");

const addPost = async (req, res) => {
  const { user } = req.body;
  //   creating the created by user._id
  req.body.createdBy = user._id;
  try {
    const post = new PostModel(req.body);
    await post.save();

    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const { user } = req.body;

  try {
    let post = await PostModel.findById(id);
    // check if post exist or not
    if (!post) {
      return res.status(404).send({ message: "Post not Found" });
    }

    // check if post is created  by the authenticated user or not
    if (post.createdBy.toString() === user._id.toString()) {
      await PostModel.findByIdAndDelete(id);
      res.send({ message: "Post is successfully deleted" });
    } else {
      res
        .status(400)
        .send({ message: "You are not authorized to delete this post" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  try {
    const post = await PostModel.findById(id);
    // check if post exist

    if (!post) {
      return res.status(404).send({ message: "Post not Found" });
    }

    // Check if user has already liked the post
    let userId = user._id;
    if (post.likes.includes(userId.toString())) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    // Add user to post's likes array
    post.likes.push(userId.toString());
    await post.save();

    // Return success response
    res.json({ message: "Post liked successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

const unlikePost = async (req, res) => {
  const { id } = req.params;

  const { user } = req.body;
  try {
    const post = await PostModel.findById(id);
    // check if post exist

    if (!post) {
      return res.status(404).send({ message: "Post not Found" });
    }

    post.likes = post.likes.filter((f) => f.toString() !== user._id.toString());

    await post.save();

    res.send({ message: "Unlike Successfull" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

const commentPost = async (req, res) => {
  const { id } = req.params;

  const { user, text } = req.body;

  try {
    // Check if post exists
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // create the comment using comment model
    const comment = new CommentModel({
      text,
      createdBy: user._id,
      post: post._id,
    });

    await comment.save();

    // build relationships with post
    post.comments.push(comment._id);
    post.save();

    res.send({ commentID: comment._id });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

module.exports = {
  addPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
};
