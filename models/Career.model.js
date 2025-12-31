import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    resume: { type: String, required: true }, // file path
    portfolio: { type: String }, // optional URL
    coverLetter: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Career", careerSchema);
