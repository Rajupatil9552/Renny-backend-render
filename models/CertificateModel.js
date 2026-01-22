
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true }, // Path to the uploaded file
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Certificate', certificateSchema);