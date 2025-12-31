import Event from "../models/Event.model.js";
import slugify from "slugify";

/* =====================
   CREATE
===================== */
export const createEventService = async (data) => {
  const {
    title,
    description,
    eventDate,
    videoLink,
    image,
    status
  } = data;

  const slug = slugify(title, { lower: true, strict: true });

  return await Event.create({
    title,
    slug,
    description,
    eventDate,
    videoLink,
    image, // URL string
    status
  });
};

/* =====================
   UPDATE
===================== */
export const updateEventService = async (id, data) => {
  if (data.title) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  return await Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

/* =====================
   DELETE
===================== */
export const deleteEventService = async (id) => {
  return await Event.findByIdAndDelete(id);
};

/* =====================
   PUBLIC READ
===================== */
export const getEventsService = async (filter = {}) => {
  return await Event.find(filter).sort({ eventDate: 1 });
};

export const getEventBySlugService = async (slug) => {
  return await Event.findOne({ slug });
};
