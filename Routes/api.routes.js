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
} = require("../Controller/Post.controller");

const router = express.Router();

// POST /api/authenticate
router.post("/authenticate", authenticate);

// POST /api/follow/{id}
router.post("/follow/:id", authenticator, follow);

// POST /api/unfollow/{id}
router.post("/unfollow/:id", authenticator, unfollow);

// GET /api/user
router.get("/user", authenticator, getUser);

// POST api/posts/
router.post("/posts", authenticator, addPost);

// DELETE api/posts/{id}
router.delete("/posts/:id", authenticator, deletePost);

// POST /api/like/{id}
router.post("/like/:id", authenticator, likePost);

// POST /api/unlike/{id}
router.post("/unlike/:id", authenticator, unlikePost);

module.exports = {
  router,
};
