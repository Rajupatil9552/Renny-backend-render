import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  emails: [{ type: String }],
  phones: [{ type: String }],
  offices: [
    {
      type: { type: String, enum: ['Registered Office', 'Site Office', 'Other'], default: 'Registered Office' },
      title: String,
      addressLine1: String,
      addressLine2: String,
      cityStateZip: String
    }
  ]
}, { timestamps: true });

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);
export default ContactInfo;
