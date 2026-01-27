import express from "express";
import { uploadToS3 } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// routes/uploadRoutes.js
router.post("/upload", (req, res) => {
  // Uses the 'file' key from your FormData
  uploadToS3.single("file")(req, res, (err) => {
    if (err) {
      console.error("S3 Upload Error:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    // Returns a consistent 'fileUrl' for both images and PDFs
    res.status(200).json({
      success: true,
      fileUrl: req.file.location 
    });
  });
});

export default router;