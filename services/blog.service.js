import Blog from "../models/BlogModel.js";
import slugify from "slugify";

/* =====================
   CREATE
===================== */
export const createBlogService = async (data) => {
  const { title, content, faqs, image, status } = data;

  const slug = slugify(title, { lower: true, strict: true });

  return await Blog.create({
    title,
    slug,
    content,
    faqs,
    image, // URL string
    status,
    publishedAt: status === "published" ? new Date() : null
  });
};

/* =====================
   UPDATE
===================== */
export const updateBlogService = async (id, data) => {
  if (data.title) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }

  return await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

/* =====================
   DELETE
===================== */
export const deleteBlogService = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

/* =====================
   PUBLIC READ
===================== */
export const getBlogsService = async (filter = {}) => {
  return await Blog.find(filter).sort({ createdAt: -1 });
};

export const getBlogBySlugService = async (slug) => {
  return await Blog.findOne({ slug });
};
