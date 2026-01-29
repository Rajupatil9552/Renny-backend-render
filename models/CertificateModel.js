import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true }, // Stores S3 URL
  description: { type: String, required: true }, // Added to match provided data
  type: { type: String, enum: ['file', 'link'], default: 'file' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);