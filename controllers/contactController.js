import Contact from "../models/ContactModel.js";
import { sendContactEmails } from "../utils/sendEmail.js"; // Ensure this matches your utility filename

// [CREATE] - For the Public Contact Form
export const submitEnquiry = async (req, res) => {
  try {
    // 1. Extract data from the frontend request body
    const { 
      fullName, 
      email, 
      companyName, 
      classification, 
      industry, 
      country, 
      phoneNumber, 
      inquiry, 
      privacyPolicyAccepted, 
      receiveUpdates 
    } = req.body;

    // 2. Create a new document in the database (Ensures the lead is saved first)
    const newEnquiry = await Contact.create({
      fullName,
      email,
      companyName,
      classification,
      industry,
      country,
      phoneNumber,
      inquiry,
      privacyPolicyAccepted,
      receiveUpdates
    });

    // 3. Trigger Email Notifications to BOTH ends
    // We wrap this in a sub-try-catch so that if SMTP fails, 
    // the user still gets a success response because the data is saved in DB.
    try {
      await sendContactEmails({ 
        fullName, 
        email, 
        companyName, 
        classification, 
        industry, 
        country, 
        phoneNumber, 
        inquiry, 
        receiveUpdates 
      });
    } catch (mailError) {
      console.error("Email Notification Error:", mailError);
    }

    // 4. Send success response back to Renny website
    res.status(201).json({ 
      success: true, 
      message: "Your enquiry has been received and confirmation has been sent to your email!", 
      data: newEnquiry 
    });
    
  } catch (err) {
    // Handle errors (e.g., database validation errors)
    console.error("Submission Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// [READ] - For the Admin Panel News/Enquiry Console
export const getAllEnquiries = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // Expect format YYYY-MM-DD
    let query = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);
        query.createdAt.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const enquiries = await Contact.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// [DELETE] - To remove an enquiry from the console
export const deleteEnquiry = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};