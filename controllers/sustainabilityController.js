
import { SustainabilityReport } from '../models/SustainabilityModel.js';
import axios from 'axios';

export const submitReport = async (req, res) => {
  try {
    const { name, email, phone, captchaToken } = req.body;

    // 1. Verify reCAPTCHA with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    
    const { data } = await axios.post(verifyUrl);

    if (!data.success) {
      return res.status(400).json({ success: false, message: "reCAPTCHA verification failed." });
    }

    // 2. Save lead to Database
    const newLead = await SustainabilityReport.create({ name, email, phone });

    res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      data: newLead
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Panel Controller: Fetch all leads
export const getReportLeads = async (req, res) => {
  try {
    const leads = await SustainabilityReport.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch leads" });
  }
};