import mongoose from 'mongoose';

const governanceContentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String }, 
  
  // Board Specific - Stores S3 URL
  img: { type: String },          
  
  // Committee Specific
  committeeTitle: { type: String }, 
  position: { type: String },       
  
  // Contact Specific
  companyName: { type: String },    
  email: { type: String },          
  phone: { type: String },          
  officeAddress: { type: String },  
  
  uploadedAt: { type: Date, default: Date.now }
});

const governanceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, 
  label: { type: String, required: true }, 
  order: { type: Number, default: 0 },
  content: [governanceContentSchema]
}, { timestamps: true });

export default mongoose.model('Governance', governanceSchema);