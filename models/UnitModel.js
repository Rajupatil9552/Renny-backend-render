import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
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

const Unit = mongoose.model('Unit', unitSchema);
export default Unit;
