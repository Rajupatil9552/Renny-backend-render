import express from "express";
import {
  getAllNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews
} from "../controllers/news.controller.js";

import { sanitizeContent } from "../middlewares/sanitizeHtml.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES (READ)
========================= */

// GET /api/news
router.get("/", getAllNews);

// GET /api/news/:slug
router.get("/:slug", getNewsBySlug);

/* =========================
   CMS ROUTES (WRITE)
========================= */

// POST /cms/news
router.post("/", sanitizeContent, createNews);

// PUT /cms/news/:id
router.put("/:id", sanitizeContent, updateNews);

// DELETE /cms/news/:id
router.delete("/:id", deleteNews);

export default router;
