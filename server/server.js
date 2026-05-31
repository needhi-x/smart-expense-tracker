const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // 🔥 VERY IMPORTANT

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// SERVER
app.listen(5000, () => console.log("Server running on port 5000"));