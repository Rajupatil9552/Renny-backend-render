import mongoose from 'mongoose';

// The "Particular Record" schema
const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const industrySchema = new mongoose.Schema({
  // Use 'slug' instead of 'pageName' to match your Financials logic
  slug: { type: String, default: "industry-report", unique: true }, 
   order: { type: Number, default: 0 },
  reports: [reportSchema] 
}, { timestamps: true });

export default mongoose.model('Industry', industrySchema);