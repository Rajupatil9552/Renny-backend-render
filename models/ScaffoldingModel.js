import mongoose from 'mongoose';

const scaffoldingProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  application: {
    type: String,
  },
  page: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const ScaffoldingProduct = mongoose.model('ScaffoldingProduct', scaffoldingProductSchema);
export default ScaffoldingProduct;
