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

module.exports = {
  addPost,
  deletePost,
};
