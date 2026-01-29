import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  
  // Personal Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String }, // Calculated field or full string
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },

  // Address Information (From Screenshot 2)
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },

  // Documents (From Screenshot 3)
  resumeUrl: { type: String, required: true }, // S3 URL
  coverLetter: { type: String, required: true },

  // Other Information (From Screenshot 4)
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  
  status: { 
    type: String, 
    enum: ["New", "Reviewed", "Shortlisted", "Rejected"], 
    default: "New" 
  }
}, { timestamps: true });

// Pre-save to combine names
candidateSchema.pre("save", function (next) {
  // Combine names before saving to MongoDB Atlas
  this.fullName = `${this.firstName} ${this.lastName}`.trim();
  
  // Ensure next is called to proceed with the save operation
  if (typeof next === 'function') {
    next();
  }
});

export default mongoose.model("Candidate", candidateSchema);