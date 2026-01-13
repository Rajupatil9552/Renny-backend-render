import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // Department is now an ENUM for easy filtering
  department: { 
    type: String, 
    required: true,
    enum: [
      "Engineering",
      "IT & Software",
      "Customer Support", 
      "Operations", 
      "Human Resources", 
      "Sales & Marketing", 
      "Finance", 
      "Production", 
      "Quality Control"
    ],
    default: "Engineering"
  },
  location: { type: String, required: true },
  jobType: { type: String, enum: ["Full-time", "Part-time", "Contract", "Remote","Temporary","Trainee"], default: "Full-time" },
  salary: { type: String },
  aboutCompany: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);