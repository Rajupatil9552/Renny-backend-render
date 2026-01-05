import mongoose from 'mongoose';

const policiesSchema = new mongoose.Schema({
  // Unique identifier for tab switching (e.g., "archival")
  slug: { type: String, required: true, unique: true }, 
  // Text displayed on the tab button (e.g., "Archival Policy")
  label: { type: String, required: true },             
  // Full name of the document shown in the card
  docName: { type: String, required: true },           
  // Google Drive link for the PDF
  url: { type: String, required: true },               
  // Sequence for the horizontal scroller
  updatedAt: { type: Date, default: Date.now },
  order: { type: Number, default: 0 }                  
}, { timestamps: true });

export default mongoose.model('Policy', policiesSchema);