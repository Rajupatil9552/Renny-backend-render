// models/ContactModel.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, "Full name is required"], 
    trim: true,
    maxLength: [100, "Full name cannot exceed 100 characters"]
  },
  email: { 
    type: String, 
    required: [true, "Email address is required"], 
    trim: true,
    lowercase: true,
    maxLength: [150, "Email address cannot exceed 150 characters"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    maxLength: [150, "Company name cannot exceed 150 characters"]
  },
  classification: {
    type: String,
    required: [true, "Classification is required"],
    trim: true,
    enum: {
      values: ["Business Inquiry", "Personal or Consumer Inquiry"],
      message: "Classification must be Business Inquiry or Personal or Consumer Inquiry"
    }
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
    trim: true,
    enum: {
      values: ["Technology", "Manufacturing", "Retail", "Healthcare", "Other"],
      message: "Please select a valid industry"
    }
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
    enum: {
      values: ["India", "United States", "United Kingdom", "United Arab Emirates", "Canada", "Australia", "Singapore", "Germany", "Other"],
      message: "Please select a valid country"
    }
  },
  phoneNumber: { 
    type: String, 
    required: [true, "Phone number is required"],
    trim: true,
    maxLength: [20, "Phone number cannot exceed 20 characters"],
    match: [/^\+?[0-9\s\-]+$/, "Please enter a valid phone number"]
  },
  inquiry: { 
    type: String, 
    required: [true, "Inquiry is required"],
    trim: true,
    maxLength: [3000, "Inquiry content cannot exceed 3000 characters"]
  },
  privacyPolicyAccepted: {
    type: Boolean,
    required: [true, "You must acknowledge the Privacy Policy"],
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: "You must acknowledge and accept the Privacy Policy"
    }
  },
  receiveUpdates: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new"
  }
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);