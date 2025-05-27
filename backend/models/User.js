const mongoose = require("mongoose");
const { Schema } = mongoose;

const Postschema = new Schema({
  email: { type: String },
  username: { type: String },
  Post: { type: String },
});

const Post = mongoose.model("Post", Postschema);

module.exports = Post;
