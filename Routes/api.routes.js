const express = require("express");
const {
  follow,
  authenticate,
  unfollow,
} = require("../Controller/User.controller");
const { authenticator } = require("../Middlewares/authenticator");

const router = express.Router();

// POST /api/authenticate
router.post("/authenticate", authenticate);

// POST /api/follow/{id}
router.post("/follow/:id", authenticator, follow);

// POST /api/unfollow/{id}
router.post("/unfollow/:id", authenticator, unfollow);

module.exports = {
  router,
};
