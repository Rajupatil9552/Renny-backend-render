import express from "express";
const router = express.Router();
import { upsertEvent, getAllEvents, deleteEvent } from "../controllers/eventController.js";

// Public: Get events | Admin: Get all including drafts with ?role=admin
router.get("/", getAllEvents);

// Admin: Create or Update
router.post("/upsert", upsertEvent);

// Admin: Delete
router.delete("/:id", deleteEvent);

export default router;