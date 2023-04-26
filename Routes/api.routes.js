const express = require("express");
const {
  follow,
  authenticate,
  unfollow,
  getUser,
} = require("../Controller/User.controller");
const { authenticator } = require("../Middlewares/authenticator");
const { addPost, deletePost } = require("../Controller/Post.controller");

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

module.exports = {
  router,
};
