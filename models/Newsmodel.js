import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      index: true
    },

    summary: {
      type: String, // short text for listing cards
      trim: true
    },

    content: {
      type: String,
      required: true // HTML allowed (<p>, <b>, etc.)
    },

    image: {
      type: String // image URL or filename
    },

    source: {
      type: String // optional external source / reference
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },

    publishedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);
