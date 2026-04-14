import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  points: {
    type: [String],
    default: []
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Specification = mongoose.model('Specification', specificationSchema);
export default Specification;
