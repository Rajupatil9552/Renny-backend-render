import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["paragraph", "heading", "numbered-list", "bullet-list"], 
    required: true 
  },
  content: { type: String }, // Used for paragraphs and headings
  listItems: [{              // Used for lists (Item title + Description)
    title: String,
    description: String
  }]
}, { _id: false });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  excerpt: { type: String, required: true },
  mainImage: { type: String },
  bodySections: [sectionSchema],
  status: { 
    type: String, 
    enum: ["draft", "published"], 
    default: "draft" 
  },
  publishedAt: { type: Date }
}, { timestamps: true });

// Auto-generate slug from title - Fixed Version
blogSchema.pre("save", async function() {
  if (this.isModified("title") && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, '');    // Trim hyphens from start/end
  }
  
});

export default mongoose.model("Blog", blogSchema);  