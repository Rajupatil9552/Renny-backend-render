import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // Remove 'required: true' here
  videoUrl: { type: String }, 
  type: { type: String, enum: ['file', 'link'], default: 'file' },
  uploadedAt: { type: Date, default: Date.now }
});
const ipoAvSchema = new mongoose.Schema({
  slug: { type: String, default: "ipo-av", unique: true },
  label: { type: String, default: "IPO Audio Visual" },
  videos: [videoSchema]
}, { timestamps: true });

export default mongoose.model('IpoAv', ipoAvSchema);