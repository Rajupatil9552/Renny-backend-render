import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productSlug: { 
    type: String, // e.g., 'ms-billets'
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  capacity: {
    type: String, // e.g., "Annualised Capacity: 1,89,000 MTPA"
  },
  description: {
    type: [String], // Array of paragraphs
  },
  highlights: [{ 
    text: String
  }],
  highlightsImage: { 
    type: String
  },
  manufacturingImage: { 
    type: String
  },
  manufacturingProcess: {
    type: [String] // Array of paragraphs
  },
  coreStrengths: [{
    title: String,
    desc: String,
    img: String
  }],
  specifications: [{
    parameter: String,
    details: String
  }],
  applicationsIntro: {
    type: String
  },
  applications: [{
    label: String,
    img: String
  }]
}, { timestamps: true });

const ProductContent = mongoose.model('ProductContent', productSchema);
export default ProductContent;
