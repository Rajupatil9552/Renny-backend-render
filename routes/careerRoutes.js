import express from "express";
import { upsertJob, getAllJobs, deleteJob } from "../controllers/jobController.js";
import { applyToJob, getApplications, deleteApplication } from "../controllers/candidateController.js";

const router = express.Router();

// --- JOB POSTINGS (Admin & Public) ---
router.get("/jobs", getAllJobs);           // Fetch jobs
router.post("/jobs/upsert", upsertJob);    // Create/Update job
router.delete("/jobs/:id", deleteJob);     // Delete job

// --- APPLICATIONS (Admin & Public) ---
router.post("/apply", applyToJob);         // User submits application
router.get("/applications", getApplications); // Admin views apps
router.delete("/applications/:id", deleteApplication); // Admin deletes app

export default router;