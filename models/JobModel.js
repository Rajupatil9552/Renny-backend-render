import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true }, // For JobDetails page routing
  department: { 
    type: String, 
    required: true,
    enum: [
      "Engineering", "IT & Software", "Customer Support", 
      "Operations", "Human Resources", "Sales & Marketing", 
      "Finance", "Production", "Quality Control"
    ],
    default: "Engineering"
  },
  location: { type: String, required: true },
  jobType: { type: String, enum: ["Full-time", "Part-time", "Contract", "Remote","Temporary","Trainee"], default: "Full-time" },
  salary: { type: String },
  aboutCompany: { type: String, required: true },
  description: { type: String, required: true }, // Preserves \n from admin
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-generate unique slug
jobSchema.pre("save", function(next) {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  }
  
});

export default mongoose.model("Job", jobSchema);