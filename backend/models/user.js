const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  isEmailVerified: { type: Boolean, default: false },
  password: { type: String },
  token: { type: String },
});

const UserModel = mongoose.model("user", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

const serializeUser = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    isVerified: user.isEmailVerified,
    ...(user.token && { token: user.token }),
  };
};

module.exports = { UserModel, validateUser, serializeUser };
