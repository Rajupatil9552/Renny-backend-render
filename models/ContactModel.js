// models/ContactModel.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, "Full name is required"], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Email address is required"], 
    trim: true,
    lowercase: true
  },
  phoneNumber: { 
    type: String, 
    required: [true, "Phone number is required"] 
  },
  enquiryType: { 
    type: String, 
    required: [true, "Please select an enquiry type"],
    enum: ["General Enquiry", "Product Enquiry", "Partnership", "Collaboration"]
  },
  message: { 
    type: String, 
    required: [true, "Message content is required"],
    trim: true 
  },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new"
  }
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);