const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  place: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
