import Contact from "../models/Contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { fullName, email, mobile, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        message: "Full name, email and message are required"
      });
    }

    await Contact.create({
      fullName,
      email,
      mobile,
      message
    });

    res.status(201).json({
      message: "Thank you for contacting us"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
