const { UserModel } = require("../Model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// function to handle the authenticate endpoint
const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    let user = await UserModel.findOne({ email });

    // Check if user exist or not
    if (!user) {
      // if user doesn't exist create a User and store in the DB

      const hash = await bcrypt.hash(password, +process.env.saltRounds);

      //   creating a new User and storing the data into the table
      const newUser = new UserModel({
        email,
        password: hash,
        username: email.split("@")[0],
      });

      await newUser.save();
      user = newUser;
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(400).json({ message: "Error is Password Hashing" });
      }
      if (result) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ token });
      } else {
        return res.status(400).json({ message: "Wrond Password" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
};

const follow = async (req, res) => {
  const userId = req.params.id;
  const followerId = req.body.user._id;

  try {
    // Check if userId and followerId are provided
    if (!userId || !followerId) {
      return res
        .status(400)
        .json({ message: "Both userId and followerId are required." });
    }

    // Check if userId and followerId are not the same
    if (userId === followerId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    // Check if both users exist
    const [user, follower] = await Promise.all([
      UserModel.findById(userId),
      UserModel.findById(followerId),
    ]);
    if (!user || !follower) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if follower is already following user
    if (user.followers.includes(followerId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    // Add follower to user's followers array
    user.followers.push(followerId);
    await user.save();

    // Add user to follower's following array
    follower.followings.push(userId);
    await follower.save();

    // Return success response
    res.json({ message: "User followed successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const unfollow = async (req, res) => {
  const userId = req.params.id;
  const followerId = req.body.user._id;

  try {
    // Check if userId and followerId are provided
    if (!userId || !followerId) {
      return res
        .status(400)
        .json({ message: "Both userId and followerId are required." });
    }

    // Check if userId and followerId are not the same
    if (userId === followerId) {
      return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    // Check if both users exist
    const [user, follower] = await Promise.all([
      UserModel.findById(userId),
      UserModel.findById(followerId),
    ]);
    if (!user || !follower) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if follower is already following user
    if (!user.followers.includes(followerId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    // Remove follower from user's followers array
    user.followers = user.followers.filter(
      (f) => f.toString() !== followerId.toString()
    );
    await user.save();

    // Remove user from follower's following array
    follower.followings = follower.followings.filter(
      (f) => f.toString() !== userId
    );
    console.log({ follower });
    await follower.save();

    // Return success response
    res.json({ message: "User unfollowed successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getUser = (req, res) => {
  // getting data set by the authenticator middleware
  const { user } = req.body;

  res.send(user);
};

module.exports = {
  authenticate,
  follow,
  unfollow,
  getUser,
};
