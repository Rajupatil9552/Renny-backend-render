import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: { 
    type: String
  },
  quote: { 
    type: String,
    required: true
  },
  order: { 
    type: Number,
    default: 0
  }
}, { timestamps: true });

const SuccessStory = mongoose.model('SuccessStory', successStorySchema);
export default SuccessStory;
