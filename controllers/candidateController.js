import Candidate from "../models/CandidateModel.js";

// [CREATE] User applies for a job
export const applyToJob = async (req, res) => {
  try {
    // 1. Destructure the data sent from the frontend form
    const { jobId, fullName, email, phoneNumber, resumeUrl, coverLetter } = req.body;

    // 2. Create the candidate record
    const application = await Candidate.create({
      jobId,         // The _id of the Job being applied for
      fullName,
      email,
      phoneNumber,
      resumeUrl,     // Usually a Google Drive link or Cloudinary URL
      coverLetter
    });

    // 3. Return success to the user
    res.status(201).json({ 
      success: true, 
      message: "Application submitted successfully!", 
      data: application 
    });
  } catch (err) {
    console.error("Application Submission Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// [READ] Admin views all applications
export const getApplications = async (req, res) => {
  try {
    const list = await Candidate.find()
      .populate('jobId', 'title department') // Attaches job details to the application
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// [DELETE] Admin removes an application
export const deleteApplication = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Application record removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};