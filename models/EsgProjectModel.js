import mongoose from 'mongoose';

const esgProjectSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  img: { 
    type: String,
    required: true
  },
  content: { 
    type: String,
    required: true
  },
  // Allows customizing the title of the points section for each project
  pointsTitle: {
    type: String,
    default: "Infrastructure"
  },
  // The actual points/list items
  points: {
    type: [String],
    default: []
  },
  order: { 
    type: Number,
    default: 0
  }
}, { timestamps: true });

const EsgProject = mongoose.model('EsgProject', esgProjectSchema);
export default EsgProject;
