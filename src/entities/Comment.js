import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  userName: {
    type: String,
    require: true
  },
  comment: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});


export default commentSchema;