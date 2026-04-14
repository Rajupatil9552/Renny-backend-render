import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  year: { 
    type: String,
    required: true
  },
  image: { 
    type: String
  },
  content: { 
    type: String,
    required: true
  },
  order: { 
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Timeline = mongoose.model('Timeline', timelineSchema);
export default Timeline;
