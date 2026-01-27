import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    // "image" is now a valid section type alongside text and lists
    enum: ["paragraph", "heading", "numbered-list", "bullet-list", "image"], 
    required: true 
  },
  content: { type: String }, // Stores text or image captions
  image: { type: String },   // Stores the S3 URL for image sections
  listItems: [{ 
    title: String,
    description: String
  }]
}, { _id: false });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  excerpt: { type: String, required: true },
  mainImage: { type: String }, // Thumbnail/Hero image
  bodySections: [sectionSchema],
  status: { 
    type: String, 
    enum: ["draft", "published"], 
    default: "draft" 
  },
  publishedAt: { type: Date }
}, { timestamps: true });

// Existing slug logic remains unchanged
blogSchema.pre("save", async function() {
  if (this.isModified("title") && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');    
  }
});

export default mongoose.model("Blog", blogSchema);