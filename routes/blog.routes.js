import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blog.controller.js";

import { sanitizeContent } from "../middlewares/sanitizeHtml.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES (READ)
========================= */

// GET /api/blogs
router.get("/", getBlogs);

// GET /api/blogs/:slug
router.get("/:slug", getBlogBySlug);

/* =========================
   CMS ROUTES (WRITE)
========================= */

// POST /cms/blogs
router.post("/", sanitizeContent, createBlog);

// PUT /cms/blogs/:id
router.put("/:id", sanitizeContent, updateBlog);

// DELETE /cms/blogs/:id
router.delete("/:id", deleteBlog);

export default router;
