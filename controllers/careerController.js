import Career from "../models/CareerModel.js";

export const applyCareer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      phone,
      email,
      portfolio,
      coverLetter
    } = req.body;

    if (!firstName || !lastName || !phone || !email) {
      return res.status(400).json({
        message: "First name, last name, phone and email are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required"
      });
    }

    const resumePath = `/uploads/resumes/${req.file.filename}`;

    await Career.create({
      firstName,
      lastName,
      address,
      phone,
      email,
      resume: resumePath,
      portfolio,
      coverLetter
    });

    res.status(201).json({
      message: "Application submitted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
