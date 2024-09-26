const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Transactly");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("accounts", accountSchema);
const User = mongoose.model("users", userSchema);

module.exports = {
  User,
  Account,
};
