import mongoose from 'mongoose';

const patternSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Share holding pattern - Q3 2025"
  url: { type: String, required: true },   // Google Drive Link
  uploadedAt: { type: Date, default: Date.now }
});

const shareholdingSchema = new mongoose.Schema({
  slug: { type: String, default: "shareholding-pattern", unique: true },
  label: { type: String, default: "Share Holding Pattern" },
  patterns: [patternSchema] 
}, { timestamps: true });

export default mongoose.model('Shareholding', shareholdingSchema);