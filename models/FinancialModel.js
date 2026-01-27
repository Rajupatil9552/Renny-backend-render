import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true }, // This will store the S3 URL
  uploadedAt: { type: Date, default: Date.now }
});

const financialSchema = new mongoose.Schema({
  label: { type: String, required: true }, 
  slug: { type: String, required: true, unique: true }, 
  order: { type: Number, default: 0 },
  documents: [documentSchema]
}, { timestamps: true });

export default mongoose.model('Financial', financialSchema);