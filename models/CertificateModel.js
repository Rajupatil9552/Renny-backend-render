import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true }, // This will now store the S3 URL
  type: { type: String, enum: ['file', 'link'], default: 'file' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Certificate', certificateSchema);