import mongoose from 'mongoose';

const pageSectionSchema = new mongoose.Schema({
  page: { 
    type: String, 
    required: true,
    // Accepts any pageName string from the CMS (e.g. "home", "financials", "/financials/" etc.)
  },
  sectionName: { 
    type: String,
  },
  mediaUrl: { 
    type: String 
  },
  mediaType: { 
    type: String,
    enum: ['image', 'video', null]
  },
  heading: { 
    type: String 
  },
  subheading: {
    type: String
  },
  content: {
    type: String
  }
}, { timestamps: true });

// Compound index to ensure one section per page
pageSectionSchema.index({ page: 1, sectionName: 1 }, { unique: true });

const PageSection = mongoose.model('PageSection', pageSectionSchema);
export default PageSection;
