import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  date: { type: String, required: true }, 
  videoUrl: { type: String, required: true }, 
  // Added type to handle S3 vs External Link
  type: { type: String, enum: ['file', 'link'], default: 'file' },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["draft", "published"], 
    default: "draft" 
  },
  order: { type: Number, default: 0 } 
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);