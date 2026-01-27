import mongoose from 'mongoose';

const patternSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  url: { type: String, required: true },   // Now stores S3 link or Drive link
  type: { type: String, enum: ['file', 'link'], default: 'file' },
  uploadedAt: { type: Date, default: Date.now }
});

const shareholdingSchema = new mongoose.Schema({
  slug: { type: String, default: "shareholding-pattern", unique: true },
  label: { type: String, default: "Share Holding Pattern" },
  patterns: [patternSchema] 
}, { timestamps: true });

export default mongoose.model('Shareholding', shareholdingSchema);