const express = require("express");
const connectDB = require("./models/connectDb");
const upload = require("./models/storePostImage");
const Post = require("./models/User");
const app = express();
const port = 5000;
var cors = require('cors')

connectDB();

app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/post", upload.single("Post"), async (req, res) => {
  const { email, username } = req.body;
  const user = await Post.create({
    email,
    username,
    Post: req.file.filename,
  });
  if (user) {
    res.status(201).json({
      email: user.email,
      username: user.username,
      message: "Posted Successfully",
    });
  } else {
    res.status(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
