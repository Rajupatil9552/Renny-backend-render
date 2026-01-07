import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  externalLink: { type: String, required: true }, // The URL to the news site
  imageUrl: { type: String, required: true },    // News source logo or image
  status: { 
    type: String, 
    enum: ["draft", "published"], 
    default: "published" 
  },
  order: { type: Number, default: 0 } // To control which news appears first
}, { timestamps: true });

export default mongoose.model("News", newsSchema);