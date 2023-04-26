const express = require("express");
const {
  follow,
  authenticate,
  unfollow,
  getUser,
} = require("../Controller/User.controller");
const { authenticator } = require("../Middlewares/authenticator");
const {
  addPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  getSinglePost,
  getAllPost,
} = require("../Controller/Post.controller");

const router = express.Router();

// POST /api/authenticate
router.post("/authenticate", authenticate);

// GET api/posts/{id}
router.get("/posts/:id", getSinglePost);

router.use(authenticator);

// POST /api/follow/{id}
router.post("/follow/:id", follow);

// POST /api/unfollow/{id}
router.post("/unfollow/:id", unfollow);

// GET /api/user
router.get("/user", getUser);

// POST api/posts/
router.post("/posts", addPost);

// DELETE api/posts/{id}
router.delete("/posts/:id", deletePost);

// POST /api/like/{id}
router.post("/like/:id", likePost);

// POST /api/unlike/{id}
router.post("/unlike/:id", unlikePost);

// POST /api/comment/{id}
router.post("/comment/:id", commentPost);

// GET /api/all_posts
router.get("/all_posts", getAllPost);

module.exports = {
  router,
};
