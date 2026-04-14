import express from "express";
import { uploadToS3 } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", (req, res) => {
  uploadToS3.single("file")(req, res, (err) => {
    if (err) {
      // Log the FULL error so we can see the exact AWS error
      console.error("=== S3 Upload Error ===");
      console.error("Error Name:", err.name);
      console.error("Error Code:", err.Code || err.code);
      console.error("Error Message:", err.message);
      console.error("Full Error:", JSON.stringify(err, null, 2));
      console.error("======================");
      return res.status(500).json({
        success: false,
        message: err.message,
        code: err.Code || err.code,
        name: err.name,
      });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    res.status(200).json({
      success: true,
      fileUrl: req.file.location,
    });
  });
});

export default router;