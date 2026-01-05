import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const financialSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Audited Financials"
  slug: { type: String, required: true, unique: true }, // e.g., "audited-financials"
  order: { type: Number, default: 0 },
  documents: [documentSchema]
}, { timestamps: true });

export default mongoose.model('Financial', financialSchema);