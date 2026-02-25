import Candidate from "../models/CandidateModel.js";
import Job from "../models/JobModel.js";
import { sendCareerApplicationEmails } from "../utils/sendEmail.js";

export const applyToJob = async (req, res) => {
  try {
    const application = await Candidate.create(req.body);

    // --- Send confirmation emails (non-blocking) ---
    Job.findById(application.jobId)
      .then((job) => {
        return sendCareerApplicationEmails({
          firstName: application.firstName,
          lastName: application.lastName,
          email: application.email,
          phoneNumber: application.phoneNumber,
          jobTitle: job ? job.title : "N/A",
          jobDepartment: job ? job.department : "N/A",
        });
      })
      .catch((emailErr) => {
        console.error("Career application email failed:", emailErr.message);
      });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: application,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    // Basic Search/Filter logic for future scalability
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.status = status;

    const list = await Candidate.find(query)
      .populate('jobId', 'title department')
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