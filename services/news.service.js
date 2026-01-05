import News from "../models/Newsmodel.js";
import slugify from "slugify";

/* =====================
   CREATE
===================== */
export const createNewsService = async (data) => {
  const { title, summary, content, image, source, status } = data;

  const slug = slugify(title, { lower: true, strict: true });

  return await News.create({
    title,
    slug,
    summary,
    content,
    image, // URL string
    source,
    status,
    publishedAt: status === "published" ? new Date() : null
  });
};

/* =====================
   UPDATE
===================== */
export const updateNewsService = async (id, data) => {
  if (data.title) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  return await News.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

/* =====================
   DELETE
===================== */
export const deleteNewsService = async (id) => {
  return await News.findByIdAndDelete(id);
};

/* =====================
   PUBLIC READ
===================== */
export const getNewsService = async (filter = {}) => {
  return await News.find(filter).sort({ createdAt: -1 });
};

export const getNewsBySlugService = async (slug) => {
  return await News.findOne({ slug });
};
