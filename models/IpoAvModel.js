import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  driveUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const ipoAvSchema = new mongoose.Schema({
  slug: { type: String, default: "ipo-av", unique: true },
  label: { type: String, default: "IPO Audio Visual" },
  videos: [videoSchema]
}, { 
  timestamps: true // This adds updatedAt and createdAt fields automatically
});

export default mongoose.model('IpoAv', ipoAvSchema);