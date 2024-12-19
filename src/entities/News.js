import mongoose from 'mongoose';
import commentSchema from './Comment.js';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    required: true
  },
  comments: {
    type: [commentSchema],
    default: []
  }
});


const News = mongoose.model('News', newsSchema);

export default News;
