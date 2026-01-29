import Job from "../models/JobModel.js";

// [CREATE or UPDATE]
export const upsertJob = async (req, res) => {
  const { id, ...data } = req.body;
  try {
    let job;
    // Only update if id is a valid 24-char MongoDB string
    if (id && id.length === 24) {
      job = await Job.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } else {
      job = await Job.create(data);
    }
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "A job with this title already exists." });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// [READ] Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role === 'admin' ? {} : { status: "published" };
    const jobs = await Job.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// [DELETE] Remove a job posting
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Job posting deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};