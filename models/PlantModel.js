import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  image: { 
    type: String
  },
  address: { 
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;
