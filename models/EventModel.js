import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  date: { type: String, required: true }, // e.g., "December 21, 2024"
  videoUrl: { type: String, required: true }, // URL to hosted video (Cloudinary/S3)
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["draft", "published"], 
    default: "draft" 
  },
  order: { type: Number, default: 0 } // Useful for custom sorting
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);