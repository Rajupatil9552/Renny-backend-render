import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "DRHP"
  url: { type: String, required: true },   // Google Drive Link
  uploadedAt: { type: Date, default: Date.now }
});

const ipoDocumentsSchema = new mongoose.Schema({
  slug: { type: String, default: "ipo-documents", unique: true },
  label: { type: String, default: "Offer Documents" },
  documents: [documentSchema]
}, { timestamps: true });

export default mongoose.model('IpoDocument', ipoDocumentsSchema);