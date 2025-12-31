import express from "express";
import {
  getEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller.js";

import { sanitizeContent } from "../middlewares/sanitizeHtml.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES (READ)
========================= */

// GET /api/events
router.get("/", getEvents);

// GET /api/events/:slug
router.get("/:slug", getEventBySlug);

/* =========================
   CMS ROUTES (WRITE)
========================= */

// POST /cms/events
router.post("/", sanitizeContent, createEvent);

// PUT /cms/events/:id
router.put("/:id", sanitizeContent, updateEvent);

// DELETE /cms/events/:id
router.delete("/:id", deleteEvent);

export default router;
