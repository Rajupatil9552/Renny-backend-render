import mongoose from 'mongoose';

const designCentreSchema = new mongoose.Schema({
  introTitle: { 
    type: String, 
    default: "Design Centre" 
  },
  introParagraphsTop: [{ type: String }],
  introImage: { type: String },
  introParagraphsBottom: [{ type: String }],
  stats: [
    {
      title: String,
      desc: String
    }
  ],
  innovationHeading: { type: String },
  innovationParagraphs: [{ type: String }]
}, { timestamps: true });

const DesignCentre = mongoose.model('DesignCentre', designCentreSchema);
export default DesignCentre;
