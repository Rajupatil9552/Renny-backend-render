import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // This stores the https://... S3 link
  uploadedAt: { type: Date, default: Date.now }
});

const industrySchema = new mongoose.Schema({
  slug: { type: String, default: "industry-report", unique: true }, 
  order: { type: Number, default: 0 },
  reports: [reportSchema] 
}, { timestamps: true });

export default mongoose.model('Industry', industrySchema);