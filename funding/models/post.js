import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Postschema = new Schema({
  email: { type: String },
  username: { type: String },
  Post: { type: String },
});

export default mongoose.models.Post || model("Post", Postschema);
