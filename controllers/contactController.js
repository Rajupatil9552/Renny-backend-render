import Contact from "../models/ContactModel.js";

// [CREATE] - For the Public Contact Form
export const submitEnquiry = async (req, res) => {
  try {
    // 1. Extract data from the frontend request body
    const { fullName, email, phoneNumber, enquiryType, message } = req.body;

    // 2. Create a new document in the database
    const newEnquiry = await Contact.create({
      fullName,
      email,
      phoneNumber,
      enquiryType,
      message
    });

    // 3. Send success response back to Renny website
    res.status(201).json({ 
      success: true, 
      message: "Your enquiry has been received!", 
      data: newEnquiry 
    });
  } catch (err) {
    // Handle errors (e.g., missing required fields)
    console.error("Submission Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// [READ] - For the Admin Panel News/Enquiry Console
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Contact.find().sort({ createdAt: -1 });
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