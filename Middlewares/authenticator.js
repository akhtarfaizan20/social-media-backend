const { UserModel } = require("../Model/User.model");
const jwt = require("jsonwebtoken");

const authenticator = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing." });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // storing user into the request body
    req.body.user = user;

    // proceed with the next function
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = {
  authenticator,
};
