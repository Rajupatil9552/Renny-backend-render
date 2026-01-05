import mongoose from 'mongoose';

const governanceContentSchema = new mongoose.Schema({
  // Common to all
  name: { type: String, required: true },
  designation: { type: String }, // Used as 'role' in Board and 'Designation' in Committees
  
  // Board Specific
  img: { type: String },         
  
  // Committee Specific
  committeeTitle: { type: String }, // e.g., "AUDIT COMMITTEE"
  position: { type: String },       // e.g., "Chairman" or "Member"
  
  // Contact Specific (From your Image)
  companyName: { type: String },    // "Renny Strips Limited"
  email: { type: String },          // "compliance@rennystrips.com"
  phone: { type: String },          // "+91 6283368523"
  officeAddress: { type: String },  // Full address text
  
  uploadedAt: { type: Date, default: Date.now }
});

const governanceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // 'board', 'committee', or 'contact'
  label: { type: String, required: true }, 
  order: { type: Number, default: 0 },
  content: [governanceContentSchema]
}, { timestamps: true });

export default mongoose.model('Governance', governanceSchema);