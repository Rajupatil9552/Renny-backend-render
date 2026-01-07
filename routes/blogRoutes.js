import express from "express";
const router = express.Router();
import { 
  createBlog, 
  getBlogs, 
  getBlog, 
  updateBlog, 
  deleteBlog 
} from "../controllers/blogController.js";

// Public & Admin Read
router.get("/", getBlogs);             // ?role=admin for all, else published
router.get("/:identifier", getBlog);   // identifier can be slug or ID

// Admin Operations
router.post("/", createBlog);          // Create New
router.put("/:id", updateBlog);        // Update Existing
router.delete("/:id", deleteBlog);     // Delete

export default router;