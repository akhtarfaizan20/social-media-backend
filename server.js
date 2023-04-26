// imports
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./Config/db");
const { router } = require("./Routes/api.routes");
require("dotenv").config();

// initiating the express app
const app = express();

// applying cors middleware to support Cross-Origin Resource Sharing
app.use(cors());

// applying json middleware to get access of json data
app.use(express.json());

// routes for all api Route
app.use("/api", router);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the social media app</h1>`);
});

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connectDB;
    console.log("Server is live at: http://localhost:8080");
  } catch (error) {
    console.log(error);
  }
});
