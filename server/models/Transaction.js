const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    userId: String,
    type: String,
    amount: Number,
    category: String,
    description: String,
    date: { type: Date, default: Date.now }
  })
);