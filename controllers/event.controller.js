import AppError from "../utils/AppError.js";
import {
  createEventService,
  updateEventService,
  deleteEventService,
  getEventsService,
  getEventBySlugService
} from "../services/event.service.js";

/* ======================
   PUBLIC (READ)
====================== */

// GET /api/events
export const getEvents = async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const events = await getEventsService(filter);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// GET /api/events/:slug
export const getEventBySlug = async (req, res, next) => {
  try {
    const event = await getEventBySlugService(req.params.slug);

    if (!event) {
      return next(new AppError("Event not found", 404));
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

/* ======================
   CMS (WRITE)
====================== */

// POST /cms/events
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, eventDate } = req.body;

    if (!title || !description || !eventDate) {
      return next(
        new AppError("Title, description and event date are required", 400)
      );
    }

    const event = await createEventService(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// PUT /cms/events/:id
export const updateEvent = async (req, res, next) => {
  try {
    const event = await updateEventService(req.params.id, req.body);

    if (!event) {
      return next(new AppError("Event not found", 404));
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// DELETE /cms/events/:id
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await deleteEventService(req.params.id);

    if (!event) {
      return next(new AppError("Event not found", 404));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
