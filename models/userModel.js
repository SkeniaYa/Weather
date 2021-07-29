const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
