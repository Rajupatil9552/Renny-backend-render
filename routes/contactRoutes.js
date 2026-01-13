import express from "express";
import { submitEnquiry, getAllEnquiries, deleteEnquiry } from "../controllers/contactController.js";

const router = express.Router();

// Public Route (Used by the Contact Page)
router.post("/submit", submitEnquiry);

// Admin Routes (Used by your Admin Console)
router.get("/", getAllEnquiries);
router.delete("/:id", deleteEnquiry);

export default router;