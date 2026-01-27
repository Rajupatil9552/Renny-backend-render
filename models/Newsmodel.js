import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },

  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  description: { type: String, required: true },
  externalLink: { type: String, required: true },
  imageUrl: { type: String, required: true },

  date: { type: Date, default: Date.now },

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published"
  },

  order: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model("News", newsSchema);