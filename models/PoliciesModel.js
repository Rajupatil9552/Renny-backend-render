import mongoose from 'mongoose';

const policiesSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, 
  label: { type: String, required: true },             
  docName: { type: String, required: true },           
  url: { type: String, required: true },               
  // Added type to handle S3 vs External Link
  type: { type: String, enum: ['file', 'link'], default: 'file' },
  updatedAt: { type: Date, default: Date.now },
  order: { type: Number, default: 0 }                  
}, { timestamps: true });

export default mongoose.model('Policy', policiesSchema);