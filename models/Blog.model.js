import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true } // HTML allowed
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
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

    content: {
      type: String,
      required: true // HTML string (<p>, <b>, etc.)
    },

    faqs: [faqSchema],

    image: {
      type: String // URL or filename
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

export default mongoose.model("Blog", blogSchema);
