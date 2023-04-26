const { default: mongoose } = require("mongoose");

// Schema for the User
const UserSchema = mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    followings: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

// Model for the User Collection
const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
};
