import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  resumeUrl: { type: String, required: true }, // Google Drive or Cloudinary link
  coverLetter: { type: String },
  status: { type: String, enum: ["New", "Reviewed", "Shortlisted", "Rejected"], default: "New" }
}, { timestamps: true });

export default mongoose.model("Candidate", candidateSchema);